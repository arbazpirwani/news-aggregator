import { useContext } from 'react'
import { DependencyContext } from '../context/dependencies'
import type { Dependencies } from '../context/dependencies'

export function useDependencies(): Dependencies {
    const deps = useContext(DependencyContext)
    if (!deps) {
        throw new Error('useDependencies must be used within <DependencyProvider>')
    }
    return deps
}
