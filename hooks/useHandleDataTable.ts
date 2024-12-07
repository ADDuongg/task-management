import { filterInterface, SortEnum, sortInterface } from "@/types";
import { useCallback, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useHandleDataTable = <T>() => {
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<sortInterface<T>[]>([]);
  const [filter, setFilter] = useState<filterInterface<T>[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>('')
  const handleSortChange = useCallback(
    (field: keyof T) => {
      setSort((prevFields) => {
        const existingField = prevFields?.find((f) => f.field === field)
        if (existingField) {
          return prevFields?.map((f) =>
            f.field === field
              ? {
                  ...f,
                  order:
                    f.order === SortEnum.ASC ? SortEnum.DESC : SortEnum.ASC,
                }
              : f,
          )
        } else {
          return [...prevFields, { field, order: SortEnum.ASC }]
        }
      })
    },
    [setSort],
  )

  const handleFilterChange = useCallback(
    (column: keyof T, value: string, checked: boolean) => {
      setFilter((prevFilter) => {
        const existingFilter = prevFilter.find(
          (filterItem) => filterItem.field === column,
        )

        if (existingFilter) {
          if (checked) {
            if (!existingFilter.value.includes(value)) {
              return prevFilter.map((filterItem) =>
                filterItem.field === column
                  ? { ...filterItem, value: [...filterItem.value, value] }
                  : filterItem,
              )
            }
          } else {
            return prevFilter
              .map((filterItem) =>
                filterItem.field === column
                  ? {
                      ...filterItem,
                      value: filterItem.value.filter((v) => v !== value),
                    }
                  : filterItem,
              )
              .filter((filterItem) => filterItem.value.length > 0)
          }
        } else {
          return checked
            ? [...prevFilter, { field: column, value: [value] }]
            : prevFilter
        }

        return prevFilter
      })
    },
    [setFilter],
  )

  const getSortOrder = useCallback(
    (field: keyof T) => {
      const sortField = sort?.find((f) => f.field === field)
      return sortField ? sortField.order : undefined
    },
    [sort],
  )
  const handleLimitChange = useCallback(
    (value: number) => {
      setLimit(value)
    },
    [setLimit],
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    },
    [setSearch],
  )

  const clearSort = useCallback(() => {
    setSort([])
  }, [setSort])

  const clearFilter = useCallback(() => {
    setFilter([])
  }, [setFilter])

  const clearAll = useCallback(() => {
    setSort([])
    setFilter([])
  }, [setSort, setFilter])
  const debouncedSearchTerm = useDebounce(search, 300)

  return {
    page,
    setPage,
    sort,
    setSort,
    filter,
    setFilter,
    limit,
    setLimit,
    search: debouncedSearchTerm,
    setSearch,
    clearSort,
    clearFilter,
    clearAll,
    handleSortChange,
    handleFilterChange,
    getSortOrder,
    handleLimitChange,
    handleSearchChange,
  };
};
