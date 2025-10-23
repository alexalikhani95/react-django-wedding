import React, { type ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from 'react-router';

const queryClient = new QueryClient()

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <MemoryRouter>
            <QueryClientProvider client={queryClient}>
                    {children}
            </QueryClientProvider>
        </MemoryRouter>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }