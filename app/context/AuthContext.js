// app/context/AuthContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// URLs del Backend (¡asegúrate que el puerto sea el correcto!)
const API_URL = 'http://localhost:8080/api/v1/auth';
const LOGIN_URL = 'http://localhost:8080/login';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // --- 1. Verificar sesión (Sin cambios) ---
  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/me`, {
        credentials: 'include', 
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error verificando auth:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // --- 2. Función de Login (¡MODIFICADA!) ---
  const login = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        credentials: 'include',
        // ¡IMPORTANTE! No seguimos las redirecciones automáticamente
        redirect: 'manual' 
      });

      // --- LÓGICA DE DETECCIÓN DE LOGIN (CORREGIDA) ---
      
      // Si el tipo de respuesta es 'opaqueredirect', significa que el login
      // fue exitoso (cross-origin) y el backend nos dio una cookie de sesión.
      if (res.type === 'opaqueredirect' || res.status === 200 || (res.status === 0 && res.ok === false)) {
        // (res.status === 0 es un truco para CORS en modo 'manual')
        
        // El login fue exitoso, ahora verificamos quiénes somos
        await checkAuthStatus();
        return { success: true };
      }
      
      // Si el backend nos redirige a /login?error (tipo 'basic' o 'cors')
      if (res.status === 302 && res.headers.get('Location')?.includes('/login?error')) {
         return { success: false, error: 'Credenciales incorrectas' };
      }

      // Cualquier otro error
      return { success: false, error: 'Credenciales incorrectas' };

    } catch (error) {
      // Si hay un error de red (ej. backend apagado)
      if (error.message === 'Failed to fetch') {
          // A veces 'failed to fetch' es un login exitoso (por CORS y redirect)
          // Así que asumimos que sí y verificamos.
          await checkAuthStatus();
          return { success: true };
      }
      return { success: false, error: 'Error de red al iniciar sesión' };
    }
  };

  // --- 3. Función de Registro (Sin cambios) ---
  const register = async (nombre, email, password) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password }),
      });

      if (res.status === 201) { // 201 Created
        return { success: true };
      } else {
        const data = await res.json();
        return { success: false, error: data.error || 'Error al registrar' };
      }
    } catch (error) {
      return { success: false, error: 'Error de red al registrar' };
    }
  };

  // --- 4. Función de Logout (Sin cambios) ---
  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error("Error en logout:", error);
    } finally {
      setUser(null);
      router.push('/');
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};