export class Utilities {
    public static numberIsInteger(number: number): boolean {
        return number % 1 === 0;
    }

    public static getTotalPagesForPagination(
        allResultsCount: number,
        quantityToTake: number,
    ): number {
        let totalPages = allResultsCount / quantityToTake;
        if (!Utilities.numberIsInteger(totalPages))
        totalPages = Math.trunc(totalPages) + 1;
        if (!totalPages || !isFinite(totalPages)) totalPages = 1;
        return totalPages;
    }
};
  