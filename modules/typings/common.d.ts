declare module '*.json' {
    const value: any;
    export default value;
}

declare function require(name: string): any;

export interface IObject<D = any> {
    [s: string]: D;
}

export interface PaginationMeta {
    page: number;
    per_page: number;
    total_page: number;
    total_data: number;
}

export interface Page<T> {
    data: T[];
    meta: PaginationMeta;
}

export type Context<schema = any> = schema;

export interface RequestData<Query = any, Params = any, Body = any> {
    query: Query;
    params: Params;
    body: Body;
}

export type HandlerMethod<HandlerOutput = any> = (data: RequestData, context: Context) => Promise<HandlerOutput>;

export interface ResponseData {
    data?: any;
    meta: {
        code: number;
        user_message?: string;
        error_message?: string | null;
        error_type?: string;
        error_data?: any;
        stack?: any[];
    };
    pagination?: PaginationMeta;
}

export type MakeAny<T> = {
    [P in keyof T]?: any;
};

export type BasicType<T> = {
    [P in keyof T]?: P extends string | number | boolean ? T[P] : never;
};

export type OptionalRelation = IObject[] | undefined;

export type Attributes = string[];

export interface QueryOptions {
    page?: number;
    per_page?: number;
    sort?: string;
    attributes?: Attributes;
    cache?: boolean;
}

export interface BaseProps {
    id: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at?: string | null;
}

export interface GenericStaticClass<ClassInstance> {
    new(...params: any): ClassInstance
}

export type ModelProperties<ModelClass extends GenericStaticClass<ModelClass>> = ConstructorParameters<ModelClass>[0];
