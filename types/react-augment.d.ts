import * as React from "react";

declare module "react" {
  export interface ReactElement<
    P = any,
    T extends string | React.JSXElementConstructor<any> = string | React.JSXElementConstructor<any>
  > {
    type: T;
    props: P;
    key: React.Key | null;
  }

  export interface JSX {
    Element: React.ReactElement;
    ElementClass: React.Component<any>;
    ElementAttributesProperty: { props: {} };
    ElementChildrenAttribute: { children: {} };
    IntrinsicElements: React.JSX.IntrinsicElements;
    IntrinsicAttributes: React.Attributes;
  }

  export type JSXElementConstructor<P> = React.JSXElementConstructor<P>;
  export type ComponentType<P = {}> = React.ComponentType<P>;
  export type ComponentClass<P = {}, S = {}> = React.ComponentClass<P, S>;
  export type FunctionComponent<P = {}> = React.FunctionComponent<P>;
  export type FC<P = {}> = React.FC<P>;
  export type ReactNode = React.ReactNode;
  export type ReactChild = React.ReactChild;
  export type ReactFragment = React.ReactFragment;
  export type ReactPortal = React.ReactPortal;
  export type Key = React.Key;
  export type Ref<T> = React.Ref<T>;
  export type RefObject<T> = React.RefObject<T>;
  export type MutableRefObject<T> = React.MutableRefObject<T>;
  export type ForwardedRef<T> = React.ForwardedRef<T>;
  export type CSSProperties = React.CSSProperties;
  export type HTMLAttributes<T> = React.HTMLAttributes<T>;
  export type AllHTMLAttributes<T> = React.AllHTMLAttributes<T>;
  export type InputHTMLAttributes<T> = React.InputHTMLAttributes<T>;
  export type TextareaHTMLAttributes<T> = React.TextareaHTMLAttributes<T>;
  export type SelectHTMLAttributes<T> = React.SelectHTMLAttributes<T>;
  export type FormHTMLAttributes<T> = React.FormHTMLAttributes<T>;
  export type LabelHTMLAttributes<T> = React.LabelHTMLAttributes<T>;
  export type ButtonHTMLAttributes<T> = React.ButtonHTMLAttributes<T>;
  export type AnchorHTMLAttributes<T> = React.AnchorHTMLAttributes<T>;
  export type ImgHTMLAttributes<T> = React.ImgHTMLAttributes<T>;
  export type VideoHTMLAttributes<T> = React.VideoHTMLAttributes<T>;
  export type SourceHTMLAttributes<T> = React.SourceHTMLAttributes<T>;
  export type SVGProps<T> = React.SVGProps<T>;
  export type SVGAttributes<T> = React.SVGAttributes<T>;
  export type ComponentPropsWithRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>;
  export type ComponentPropsWithoutRef<T extends React.ElementType> = React.ComponentPropsWithoutRef<T>;
  export type PropsWithChildren<P = unknown> = React.PropsWithChildren<P>;
  export type PropsWithRef<P> = React.PropsWithRef<P>;
  export type SyntheticEvent<T = Element, E = Event> = React.SyntheticEvent<T, E>;
  export type BaseSyntheticEvent<E = object, C = any, T = any> = React.BaseSyntheticEvent<E, C, T>;
  export type FormEvent<T = Element> = React.FormEvent<T>;
  export type ChangeEvent<T = Element> = React.ChangeEvent<T>;
  export type FocusEvent<T = Element> = React.FocusEvent<T>;
  export type KeyboardEvent<T = Element> = React.KeyboardEvent<T>;
  export type MouseEvent<T = Element> = React.MouseEvent<T>;
  export type TouchEvent<T = Element> = React.TouchEvent<T>;
  export type PointerEvent<T = Element> = React.PointerEvent<T>;
  export type UIEvent<T = Element> = React.UIEvent<T>;
  export type WheelEvent<T = Element> = React.WheelEvent<T>;
  export type AnimationEvent<T = Element> = React.AnimationEvent<T>;
  export type TransitionEvent<T = Element> = React.TransitionEvent<T>;
  export type ClipboardEvent<T = Element> = React.ClipboardEvent<T>;
  export type CompositionEvent<T = Element> = React.CompositionEvent<T>;
  export type DragEvent<T = Element> = React.DragEvent<T>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
    interface Element extends React.JSX.Element {}
    interface ElementClass extends React.JSX.ElementClass {}
    interface ElementAttributesProperty extends React.JSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute extends React.JSX.ElementChildrenAttribute {}
    interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {}
  }
}

export {};
