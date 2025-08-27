// FieldSync Responsive Design System
// Systematic patterns for consistent responsive behavior across all components

export const responsivePatterns = {
  // Container Patterns
  container: {
    base: "p-4 sm:p-6",
    header: "p-4 sm:p-6 mb-6 sm:mb-8",
    card: "p-4 sm:p-6",
    section: "space-y-6 sm:space-y-8"
  },

  // Typography Patterns
  typography: {
    h1: "text-xl sm:text-2xl font-medium text-black dark:text-white",
    h2: "text-lg sm:text-xl font-medium text-black dark:text-white", 
    h3: "text-base sm:text-lg font-medium text-black dark:text-white",
    body: "text-sm sm:text-base text-black dark:text-white",
    caption: "text-xs sm:text-sm text-[#6C6C6C]"
  },

  // Grid Patterns
  grid: {
    stats: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5",
    cards: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
    calendar: "grid grid-cols-7 gap-1 sm:gap-2",
    form: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
  },

  // Layout Patterns
  layout: {
    header: "flex justify-between items-center",
    headerContent: "pl-0 sm:pl-4",
    searchRow: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
    searchBar: "relative flex-1",
    searchInput: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
    buttonGroup: "flex items-center gap-3 sm:gap-4",
    button: "px-3 sm:px-4 py-2 text-sm sm:text-base font-medium rounded-lg transition-colors"
  },

  // Component Patterns
  components: {
    statCard: {
      container: "bg-white border border-[#EBEBEB] rounded-xl p-4 sm:p-6",
      content: "flex items-center justify-between",
      text: "space-y-3 sm:space-y-4 flex-1 min-w-0",
      title: "text-sm sm:text-lg text-black dark:text-white truncate",
      value: "text-lg sm:text-2xl font-bold text-black dark:text-white",
      icon: "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
    },
    
    table: {
      container: "bg-white border border-[#EBEBEB] rounded-xl p-4 sm:p-6 overflow-x-auto",
      header: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4",
      row: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-3 border-b border-[#EBEBEB] last:border-b-0"
    },

    modal: {
      overlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",
      container: "bg-white rounded-xl max-w-full max-h-full overflow-auto",
      header: "p-4 sm:p-6 border-b border-[#EBEBEB]",
      content: "p-4 sm:p-6",
      footer: "p-4 sm:p-6 border-t border-[#EBEBEB] flex flex-col sm:flex-row gap-3 justify-end"
    }
  },

  // Spacing Patterns
  spacing: {
    section: "space-y-6 sm:space-y-8",
    card: "space-y-4 sm:space-y-6",
    item: "space-y-3 sm:space-y-4",
    text: "space-y-2"
  },

  // Interactive Elements
  interactive: {
    button: {
      primary: "bg-[#10BF0A] text-white hover:bg-[#0EA509] disabled:opacity-50 disabled:cursor-not-allowed",
      secondary: "border border-[#EBEBEB] text-black dark:text-white hover:bg-gray-50",
      small: "px-3 sm:px-4 py-2 text-sm",
      medium: "px-4 sm:px-6 py-2 text-sm sm:text-base"
    },
    
    input: {
      base: "w-full px-4 sm:px-6 py-2 sm:py-3 border border-[#EBEBEB] rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent transition-all",
      search: "pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    }
  }
};

// Utility functions for responsive design
export const responsiveUtils = {
  // Hide elements on specific breakpoints
  hide: {
    mobile: "hidden sm:block",
    tablet: "block sm:hidden lg:block", 
    desktop: "block lg:hidden"
  },

  // Show elements on specific breakpoints
  show: {
    mobile: "block sm:hidden",
    tablet: "hidden sm:block lg:hidden",
    desktop: "hidden lg:block"
  },

  // Text truncation
  truncate: "truncate",
  ellipsis: "overflow-hidden text-ellipsis whitespace-nowrap",

  // Flex utilities
  flex: {
    center: "flex items-center justify-center",
    between: "flex items-center justify-between",
    start: "flex items-center justify-start",
    end: "flex items-center justify-end",
    col: "flex flex-col",
    row: "flex flex-row"
  }
};

// Responsive breakpoint constants
export const breakpoints = {
  mobile: 640,   // sm
  tablet: 768,   // md  
  laptop: 1024,  // lg
  desktop: 1280, // xl
  wide: 1536     // 2xl
};

// Responsive design checklist for components
export const responsiveChecklist = [
  "✅ Use mobile-first approach (default styles for mobile)",
  "✅ Apply responsive padding: p-4 sm:p-6",
  "✅ Use responsive typography: text-sm sm:text-base",
  "✅ Implement responsive grids: grid-cols-2 lg:grid-cols-4",
  "✅ Add responsive spacing: space-y-6 sm:space-y-8", 
  "✅ Use flex layouts for responsive alignment",
  "✅ Implement responsive buttons: px-3 sm:px-4",
  "✅ Add responsive icons: w-5 h-5 sm:w-6 sm:h-6",
  "✅ Use responsive containers with proper overflow",
  "✅ Test on multiple screen sizes"
];
