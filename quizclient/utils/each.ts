import { ReactNode, ReactElement, cloneElement } from "react";

interface EachProps<T> {
  render: (item: T, index: number) => any;
  of: T[];
}

export const Each = <T,>({ render, of }: EachProps<T>): ReactNode[] =>
  of.map((item, index) => cloneElement(render(item, index), { key: index }));