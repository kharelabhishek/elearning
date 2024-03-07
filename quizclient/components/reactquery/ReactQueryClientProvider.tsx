'use client';
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export const ReactQueryClientProvider = ({children}: {children: React.ReactNode}) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)

