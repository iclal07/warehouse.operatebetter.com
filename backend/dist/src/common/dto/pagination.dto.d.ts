export declare class PaginationDto {
    page: number;
    limit: number;
}
export declare const paginationMeta: (total: number, page: number, limit: number) => {
    total: number;
    page: number;
    limit: number;
    pages: number;
};
