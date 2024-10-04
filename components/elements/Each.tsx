import { Children, ReactElement } from 'react'


export function Each<T>({ of, render }: { of: Array<T>, render: (item: T, index: number) => ReactElement }) {
    return Children.toArray(of.map((item, index) => render(item, index)))
}