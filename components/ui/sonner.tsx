"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = () => {
  const { theme = "light" } = useTheme()

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      richColors
      position="bottom-right"
      expand={true}
      closeButton={true}
      toastOptions={{
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
          opacity: '1',
          backdropFilter: 'none',
          backgroundColor: 'white',
        },
      }}
    />
  )
}

export { Toaster }
