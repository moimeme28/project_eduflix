// Responsive design utilities and breakpoints

export const BREAKPOINTS = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px'
};

export const MEDIA_QUERIES = {
  xs: `(min-width: ${BREAKPOINTS.xs})`,
  sm: `(min-width: ${BREAKPOINTS.sm})`,
  md: `(min-width: ${BREAKPOINTS.md})`,
  lg: `(min-width: ${BREAKPOINTS.lg})`,
  xl: `(min-width: ${BREAKPOINTS.xl})`,
  xxl: `(min-width: ${BREAKPOINTS.xxl})`,
  xsOnly: `(max-width: ${BREAKPOINTS.sm})`,
  smOnly: `(max-width: ${BREAKPOINTS.md})`,
  mdOnly: `(max-width: ${BREAKPOINTS.lg})`,
  lgOnly: `(max-width: ${BREAKPOINTS.xl})`
};

export const useMediaQuery = (query) => {
  if (typeof window === 'undefined') return false;
  const mediaQuery = window.matchMedia(query);
  return mediaQuery.matches;
};

export const isMobile = () => useMediaQuery(MEDIA_QUERIES.smOnly);
export const isTablet = () => useMediaQuery(`(${MEDIA_QUERIES.sm}) and (${MEDIA_QUERIES.mdOnly})`);
export const isDesktop = () => useMediaQuery(MEDIA_QUERIES.lg);

export const getResponsiveValue = (values) => {
  if (typeof values === 'object' && !Array.isArray(values)) {
    if (isMobile()) return values.xs || values.mobile;
    if (isTablet()) return values.md || values.tablet;
    return values.lg || values.desktop || Object.values(values)[0];
  }
  return values;
};

export const responsive = {
  padding: {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px'
  },
  margin: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px'
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px'
  },
  gap: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px'
  },
  borderRadius: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px'
  }
};

export const getResponsiveStyle = (property, value) => {
  const responsiveValue = getResponsiveValue(value);
  return { [property]: responsiveValue };
};

export const gridColumns = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5
};

export const getGridColumns = () => {
  if (isMobile()) return gridColumns.xs;
  if (isTablet()) return gridColumns.md;
  return gridColumns.lg;
};

export const RESPONSIVE_STYLES = `
  @media (max-width: ${BREAKPOINTS.sm}) {
    .container {
      padding: ${responsive.padding.xs};
    }
    
    .grid {
      grid-template-columns: repeat(${gridColumns.xs}, 1fr);
      gap: ${responsive.gap.xs};
    }
    
    .card {
      padding: ${responsive.padding.xs};
      border-radius: ${responsive.borderRadius.xs};
    }
    
    .text {
      font-size: ${responsive.fontSize.xs};
    }
    
    .button {
      padding: ${responsive.padding.xs};
      font-size: ${responsive.fontSize.xs};
    }
  }

  @media (min-width: ${BREAKPOINTS.sm}) and (max-width: ${BREAKPOINTS.md}) {
    .container {
      padding: ${responsive.padding.sm};
    }
    
    .grid {
      grid-template-columns: repeat(${gridColumns.sm}, 1fr);
      gap: ${responsive.gap.sm};
    }
    
    .card {
      padding: ${responsive.padding.sm};
      border-radius: ${responsive.borderRadius.sm};
    }
    
    .text {
      font-size: ${responsive.fontSize.sm};
    }
    
    .button {
      padding: ${responsive.padding.sm};
      font-size: ${responsive.fontSize.sm};
    }
  }

  @media (min-width: ${BREAKPOINTS.md}) and (max-width: ${BREAKPOINTS.lg}) {
    .container {
      padding: ${responsive.padding.md};
    }
    
    .grid {
      grid-template-columns: repeat(${gridColumns.md}, 1fr);
      gap: ${responsive.gap.md};
    }
    
    .card {
      padding: ${responsive.padding.md};
      border-radius: ${responsive.borderRadius.md};
    }
    
    .text {
      font-size: ${responsive.fontSize.md};
    }
    
    .button {
      padding: ${responsive.padding.md};
      font-size: ${responsive.fontSize.md};
    }
  }

  @media (min-width: ${BREAKPOINTS.lg}) {
    .container {
      padding: ${responsive.padding.lg};
    }
    
    .grid {
      grid-template-columns: repeat(${gridColumns.lg}, 1fr);
      gap: ${responsive.gap.lg};
    }
    
    .card {
      padding: ${responsive.padding.lg};
      border-radius: ${responsive.borderRadius.lg};
    }
    
    .text {
      font-size: ${responsive.fontSize.lg};
    }
    
    .button {
      padding: ${responsive.padding.lg};
      font-size: ${responsive.fontSize.lg};
    }
  }
`;

export const getTouchFriendlySize = (baseSize) => {
  // Ensure touch targets are at least 44x44px for mobile
  const minTouchSize = 44;
  return Math.max(parseInt(baseSize) || 0, minTouchSize);
};

export const getResponsiveImageSize = (baseWidth) => {
  if (isMobile()) return Math.min(baseWidth, 300);
  if (isTablet()) return Math.min(baseWidth, 500);
  return baseWidth;
};

export const hideScrollbarMobile = `
  @media (max-width: ${BREAKPOINTS.md}) {
    ::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }
`;

export default {
  BREAKPOINTS,
  MEDIA_QUERIES,
  useMediaQuery,
  isMobile,
  isTablet,
  isDesktop,
  getResponsiveValue,
  responsive,
  getResponsiveStyle,
  gridColumns,
  getGridColumns,
  RESPONSIVE_STYLES,
  getTouchFriendlySize,
  getResponsiveImageSize,
  hideScrollbarMobile
};
