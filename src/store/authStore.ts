import { create } from 'zustand'
import type { UserMeResponse } from '@/types/User'

interface AuthState {
  user: UserMeResponse | null
  accessToken: string | null
  isLoggedIn: boolean
  isAuthChecking: boolean // flag 변수
  setAuth: (token: string, userData: UserMeResponse | null) => void
  setUser: (partialUser: Partial<UserMeResponse>) => void
  logout: () => void
  setAuthChecked: (checked: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoggedIn: false,
  isAuthChecking: true,

  setAuth: (token: string, userData: UserMeResponse | null) =>
    set({
      accessToken: token,
      isLoggedIn: true,
      user: userData ?? null, // 로그인 할때 유저 정보 불러오기
    }),

  setUser: (partial) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, ...partial }
        : (partial as UserMeResponse),
    })),

  logout: () =>
    set({
      accessToken: null,
      isLoggedIn: false,
      user: null,
    }),

  setAuthChecked: (checked) => set({ isAuthChecking: checked }),
}))
