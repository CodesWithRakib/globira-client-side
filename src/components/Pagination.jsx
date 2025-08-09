import React from "react";
import { motion } from "motion/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;
  const halfMaxVisible = Math.floor(maxVisiblePages / 2);
  let startPage = Math.max(currentPage - halfMaxVisible, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-8 select-none">
      {/* Previous */}
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
        className={`w-10 h-10 flex items-center justify-center border rounded-md transition-all ${
          currentPage === 1
            ? "text-gray-400 border-gray-200 dark:border-gray-700 dark:text-gray-600 cursor-not-allowed"
            : "text-blue-600 border-gray-300 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
        }`}
        aria-label="Previous"
      >
        <FiChevronLeft className="w-5 h-5" />
      </motion.button>

      {/* First Page + Ellipsis */}
      {startPage > 1 && (
        <>
          <motion.button
            onClick={() => onPageChange(1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-md border flex items-center justify-center font-medium transition-colors ${
              currentPage === 1
                ? "bg-blue-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            }`}
          >
            1
          </motion.button>
          {startPage > 2 && (
            <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
          )}
        </>
      )}

      {/* Page Buttons */}
      {pageNumbers.map((number) => (
        <motion.button
          key={number}
          onClick={() => onPageChange(number)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 rounded-md border flex items-center justify-center font-medium transition-colors ${
            number === currentPage
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          }`}
        >
          {number}
        </motion.button>
      ))}

      {/* Last Page + Ellipsis */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
          )}
          <motion.button
            onClick={() => onPageChange(totalPages)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-md border flex items-center justify-center font-medium transition-colors ${
              currentPage === totalPages
                ? "bg-blue-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            }`}
          >
            {totalPages}
          </motion.button>
        </>
      )}

      {/* Next */}
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
        className={`w-10 h-10 flex items-center justify-center border rounded-md transition-all ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-200 dark:border-gray-700 dark:text-gray-600 cursor-not-allowed"
            : "text-blue-600 border-gray-300 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
        }`}
        aria-label="Next"
      >
        <FiChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default Pagination;
