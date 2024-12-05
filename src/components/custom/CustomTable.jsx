import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { SplitButton } from "./SplitButton";

const TableContainer = ({
  data,
  columns = [],
  actions = [],
  selectedItems: selectedItemsProps,
  itemsPerPage = 10,
  getSelectedItems,
  headerButtons = [],
  isMultiSelection,
  globalSearch = true,
  headerSorting = true,
  idKey = "id",
  infiniteScroll = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState(selectedItemsProps || []);
  const [isCompact, setIsCompact] = useState(() => {
    const storedValue = localStorage.getItem("isCompactTable");
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply filters
    result = result.filter((item) => {
      return columns.every((column) => {
        const filter = filters[column.accessor];
        if (!filter) return true;

        const value = String(item[column.accessor]);

        switch (column.filterType) {
          case "text":
          case "select":
            return value.toLowerCase().includes(filter.value.toLowerCase());
          case "number":
          case "date": {
            const numValue =
              column.filterType === "date"
                ? new Date(value).getTime()
                : Number(value);
            const from = filter.from
              ? column.filterType === "date"
                ? new Date(filter.from).getTime()
                : Number(filter.from)
              : -Infinity;
            const to = filter.to
              ? column.filterType === "date"
                ? new Date(filter.to).getTime()
                : Number(filter.to)
              : Infinity;
            return numValue >= from && numValue <= to;
          }
          default:
            return true;
        }
      });
    });

    // Apply global filter
    if (globalFilter) {
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(globalFilter.toLowerCase())
        )
      );
    }

    // Apply sort
    if (sort) {
      result.sort((a, b) => {
        const aValue = a[sort.column];
        const bValue = b[sort.column];
        if (aValue < bValue) return sort.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sort.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, filters, sort, globalFilter, columns]);

  const loadMoreData = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setCurrentPage((prev) => prev + 1);
    setLoading(false);
  };

  const handleScroll = (e) => {
    if (!infiniteScroll) return;
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      loadMoreData();
    }
  };

  const displayData = useMemo(() => {
    if (infiniteScroll) {
      const endIndex = currentPage * itemsPerPage;
      const result = filteredAndSortedData.slice(0, endIndex);
      setHasMore(endIndex < filteredAndSortedData.length);
      return result;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage, infiniteScroll]);

  const handleFilterChange = (column, filterValue) => {
    setFilters((prev) => ({ ...prev, [column]: filterValue }));
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    setSort((prev) =>
      prev && prev.column === column
        ? { column, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { column, direction: "asc" }
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const newSelectedItems = displayData.map((item) => item);
      setSelectedItems(newSelectedItems);
      getSelectedItems(newSelectedItems);
    } else {
      setSelectedItems([]);
      getSelectedItems([]);
    }
  };

  const handleSelectItem = (item, checked) => {
    let newSelectedItems;
    if (checked) {
      newSelectedItems = [...selectedItems, item];
    } else {
      newSelectedItems = selectedItems.filter(
        (selectedItem) => selectedItem[idKey] !== item[idKey]
      );
    }
    setSelectedItems(newSelectedItems);
    getSelectedItems(newSelectedItems);
  };

  const isAllSelected =
    displayData.length > 0 && selectedItems?.length === displayData.length;

  useEffect(() => {
    setSelectedItems(selectedItemsProps);
  }, [selectedItemsProps]);

  useEffect(() => {
    localStorage.setItem("isCompactTable", JSON.stringify(isCompact));
  }, [isCompact]);

  return (
    <div className="py-2 mx-auto space-y-2 w-full">
      <div className={`flex  px-2 pt-4 ${!globalSearch ? "justify-end" : "justify-between"}`}>
        {globalSearch && (
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-xs"
          />
        )}
        <div className="flex gap-1.5 items-center">
          {headerButtons?.map((button, index) => {
              if (button.isSplit) {
                return (
                  <SplitButton
                    key={index}
                    options={button.options}
                    {...button.props}
                  />
                );
              } else {
                return (
                  <Button
                    key={index}
                    // variant="outline"

                    {...button.props}
                    onClick={button.onClick}
                  >
                    {button.icon}
                    {button.label}
                  </Button>
                );
              }
            })}
          <div className="flex items-center space-x-2"></div>
        </div>
      </div>
      <div className="border-b-2">
        <div 
          className={infiniteScroll ? "max-h-[70vh] overflow-y-auto relative" : ""}
          onScroll={handleScroll}
        >
          <Table compact={isCompact}>
            <TableHeader className="bg-[#f4f6f8] dark:bg-[#28313e] sticky top-0 z-10">
              <TableRow>
                {isMultiSelection && (
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                )}
                {columns.map((column, index) => (
                  <TableHead key={index}>
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        {headerSorting === true ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-3 h-8 data-[state=open]:bg-accent gap-2"
                            onClick={() => handleSort(column.accessor)}
                          >
                            {column.header}
                            <ArrowUpDown className="w-4 h-4" />
                            <span className="sr-only">
                              Sort by {column.header}
                            </span>
                          </Button>
                        ) : (
                          <>{column.header}</>
                        )}
                      </div>
                      {column.filterType === "text" && (
                        <Input
                          placeholder={`Filter ${column.header}`}
                          value={filters[column.accessor]?.value || ""}
                          onChange={(e) =>
                            handleFilterChange(column.accessor, {
                              value: e.target.value,
                            })
                          }
                          className="max-w-sm"
                        />
                      )}
                      {column.filterType === "select" && (
                        <select
                          value={filters[column.accessor]?.value || ""}
                          onChange={(e) =>
                            handleFilterChange(column.accessor, {
                              value: e.target.value,
                            })
                          }
                          className="p-1 max-w-sm rounded border"
                        >
                          <option value="">All</option>
                          {column.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                      {(column.filterType === "number" ||
                        column.filterType === "date") && (
                        <div className="flex space-x-2">
                          <Input
                            placeholder="From"
                            type={column.filterType}
                            value={filters[column.accessor]?.from || ""}
                            onChange={(e) =>
                              handleFilterChange(column.accessor, {
                                ...filters[column.accessor],
                                from: e.target.value,
                              })
                            }
                            className="max-w-[80px]"
                          />
                          <Input
                            placeholder="To"
                            type={column.filterType}
                            value={filters[column.accessor]?.to || ""}
                            onChange={(e) =>
                              handleFilterChange(column.accessor, {
                                ...filters[column.accessor],
                                to: e.target.value,
                              })
                            }
                            className="max-w-[80px]"
                          />
                        </div>
                      )}
                    </div>
                  </TableHead>
                ))}
                {actions && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length ? (
                displayData.map((item, rowIndex) => (
                  <TableRow key={item[idKey]}>
                    {isMultiSelection && (
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.some(
                            (selectedItem) => selectedItem[idKey] === item[idKey]
                          )}
                          onCheckedChange={(checked) =>
                            handleSelectItem(item, checked)
                          }
                          aria-label={`Select row ${rowIndex + 1}`}
                        />
                      </TableCell>
                    )}
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex}>
                        {(column?.Cell && column?.Cell(item)) ||
                          item[column.accessor]}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="p-0 w-8 h-8">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {actions.map((action, actionIndex) => (
                              <DropdownMenuItem
                                key={actionIndex}
                                onClick={() => action.onClick(item)}
                              >
                                <span className="mr-2">{action.icon}</span>
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {infiniteScroll && hasMore && (
          <div className="py-4 text-center text-sm text-muted-foreground">
            Loading more items...
          </div>
        )}
      </div>
      {!infiniteScroll && (
        <div className="flex justify-between items-center px-2">
          <div className="flex gap-1 items-center space-x-2 text-center">
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">
              {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)}{" "}
              of {filteredAndSortedData.length}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredAndSortedData.length / itemsPerPage)))
                }
                disabled={currentPage === Math.ceil(filteredAndSortedData.length / itemsPerPage)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { TableContainer };

// TableContainer.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
//   columns: PropTypes.arrayOf(
//     PropTypes.shape({
//       header: PropTypes.string.isRequired,
//       accessor: PropTypes.string.isRequired,
//       Cell: PropTypes.func,
//     })
//   ).isRequired,
//   actions: PropTypes.node,
//   itemsPerPage: PropTypes.number,
//   getSelectedItems: PropTypes.func,
//   headerButtons: PropTypes.node,
//   isMultiSelection: PropTypes.bool,
//   globalSearch: PropTypes.bool,
//   headerSorting: PropTypes.bool,
// };
