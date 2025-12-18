"use client"

import { useEffect, useState } from 'react'
import { postJSON } from '../post-json.function'
import { AccessToken, APIError, User } from '@sematicca/core'
const webStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      window.localStorage.setItem(key, value)
    } catch (error) {
      throw error
    }
  },
  async getItem(key: string): Promise<string | null> {
    try {
      return window.localStorage.getItem(key)
    } catch (error) {
      return null
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      throw error
    }
  }
}
export const ACCESS_TOKEN_KEY = '@siku_zangu:access_token'
export const AUTH_LOGIN_PATH = '/api/users/auth'

async function _loginUser(credentials: { email: string; password: string }) {
  return postJSON<{ email: string; password: string }, AccessToken>(
      AUTH_LOGIN_PATH,
      credentials
  )
}
async function _logoutUser() {
  return webStorage.removeItem(ACCESS_TOKEN_KEY)
}
function normalizeError(e: any): APIError {
  if (e && typeof e === 'object') {
    return {
      status: e.status || 500,
      message: e.message || 'An error occurred',
      issues: e.issues || []
    } as APIError
  }
  return {
    status: 500,
    message: String(e) || 'An error occurred',
    issues: []
  } as APIError
}
export function useAccessToken() {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoggingIn(true)
    setError(null)
    loadToken()
        .then((accessToken) => {
          if (
              accessToken?.token &&
              accessToken.expires_in &&
              Date.now() < accessToken.expires_in * 1000
          ) {
            setToken(accessToken.token)
            if (accessToken.user) {
              setUser(accessToken.user)
            }
          } else {
            setToken(null)
            setUser(null)
          }
        })
        .catch((e: any) => {
          const normalized = normalizeError(e)
          const errorMessage = normalized.message || 'Failed to load access token'
          setError(errorMessage)
        })
        .finally(() => setIsLoggingIn(false))
  }, [])

  async function loadToken() {
    const storedToken = await webStorage.getItem(ACCESS_TOKEN_KEY)
    if (storedToken) {
      const accessToken: AccessToken = JSON.parse(storedToken)
      if (!accessToken.token || !accessToken.expires_in) {
        await webStorage.removeItem(ACCESS_TOKEN_KEY)
        return null
      }
      return accessToken
    }
    return null
  }

  async function loginUser(credentials: { email: string; password: string }) {
    setIsLoggingIn(true)
    setError(null)
    try {
      const accessToken = await _loginUser(credentials)
      if (accessToken?.token && accessToken.expires_in) {
        await webStorage.setItem(
            ACCESS_TOKEN_KEY,
            JSON.stringify(accessToken)
        )
        setToken(accessToken.token)
        if (accessToken.user) {
          setUser(accessToken.user)
        }
        return accessToken
      }
      throw {
        status: 400,
        message: 'Invalid response from server',
        issues: []
      } as APIError
    } catch (e: any) {
      const normalized = normalizeError(e)
      const errorMessage =
          normalized.issues?.map((issue: any) => issue.message).filter(Boolean).join(', ') ||
          normalized.message ||
          (normalized.status === 401
              ? 'Invalid email or password'
              : normalized.status === 400
                  ? 'Invalid input format'
                  : 'Failed to login')

      setError(errorMessage)
      const structuredError: APIError = {
        status: normalized.status,
        message: errorMessage,
        issues: normalized.issues
      }
      throw structuredError
    } finally {
      setIsLoggingIn(false)
    }
  }
  async function logoutUser() {
    setIsLoggingOut(true)
    setError(null)
    try {
      await _logoutUser()
      setToken(null)
      setUser(null)
    } catch (e: any) {
      const normalized = normalizeError(e)
      const errorMessage = normalized.message || 'Failed to logout'
      setError(errorMessage)
      throw normalized
    } finally {
      setIsLoggingOut(false)
    }
  }

  return {
    token,
    user,
    isLoggingIn,
    isLoggingOut,
    error,
    loginUser,
    logoutUser,
  }
}