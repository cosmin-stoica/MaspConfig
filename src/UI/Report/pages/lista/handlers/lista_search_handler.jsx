export const ListaSearchHandler = (
    fileIndex,
    currentQuery,
    currentProgressivo,
    currentOperatore,
    currentBarcode,
    selectedStartDate,
    selectedEndDate
) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toISOString().split("T")[0];
    };

    const results = fileIndex.filter((item) => {
        const itemCreationDate = item.creationDate ? formatDate(item.creationDate) : null;

        const isQueryMatched =
            currentQuery.trim() &&
            !item.isFolder &&
            item.csvDataCodice &&
            item.csvDataCodice.toLowerCase().includes(currentQuery.toLowerCase());

        const isProgressivoMatched =
            currentProgressivo.trim() &&
            item.csvDataProgressivo &&
            item.csvDataProgressivo === currentProgressivo.trim();

        const isOperatoreMatched =
            currentOperatore.trim() &&
            item.csvDataOperatore &&
            item.csvDataOperatore.toLowerCase() === currentOperatore.toLowerCase().trim();

        const isBarcodeMatched =
            currentBarcode.trim() &&
            item.barcodes &&
            item.barcodes.some((barcode) =>
                barcode.toLowerCase().includes(currentBarcode.toLowerCase().trim())
            );

        const isDateMatched = (() => {
            if (selectedStartDate && !selectedEndDate) {
                return itemCreationDate === formatDate(selectedStartDate);
            }
            if (selectedStartDate && selectedEndDate) {
                return (
                    itemCreationDate >= formatDate(selectedStartDate) &&
                    itemCreationDate <= formatDate(selectedEndDate)
                );
            }
            return true;
        })();

        return (
            (!currentQuery.trim() || isQueryMatched) &&
            (!currentProgressivo.trim() || isProgressivoMatched) &&
            (!currentOperatore.trim() || isOperatoreMatched) &&
            (!currentBarcode.trim() || isBarcodeMatched) &&
            isDateMatched
        );
    });

    return results;
};
