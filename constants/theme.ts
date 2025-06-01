export const theme = {
  colors: {
    primary: "#4F46E5", // Indigo 600
    primaryDark: "#3730A3", // Indigo 800
    dark: "#1F2937", // Gray 800
    darkLight: "#4B5563", // Gray 600
    gray: "#9CA3AF", // Gray 400

    text: "#111827", // Gray 900
    textLight: "#9CA3AF", // Gray 500
    textDark: "#000000", // Pure black
    textWhite: "#F3F4F6",

    rose: "#E11D48", // Rose 600
    roseLight: "#F43F5E", // Rose 500
  },
  backgrounds: {
    white: "#FFFFFF",
    lightGray: "#F3F4F6", // Optional: for subtle UI backgrounds
    dark: "#1F2937", // Match with colors.dark
  },
  fonts: {
    family: {
      default: "System", // or your custom font
    },
    weight: {
      medium: "500" as "500",
      semibold: "600" as "600",
      bold: "700" as "700",
      extraBold: "800" as "800",
    },
    size: {
      title: 24,
      header: 20,
      subHeader: 18,
      body: 16,
      caption: 14,
      small: 12,
    },
  },
  radius: {
    xxs: 6,
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
  },
  statusColors: {
    priority: {
      low: "#4CAF50",
      medium: "#FF9800",
      high: "#F44336",
    },
    taskStatus: {
      pending: "#90A4AE",
      completed: "#2196F3",
    },
  },
};
