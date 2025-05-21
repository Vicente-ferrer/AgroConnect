declare module 'react-native-calendars' {
  export interface CalendarDot {
    key?: string;
    color?: string;
    selectedDotColor?: string;
  }

  export interface DayState {
    selected?: boolean;
    marked?: boolean;
    disabled?: boolean;
    active?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
    dotColor?: string;
    dots?: CalendarDot[];
  }

  export interface DayObject {
    day: number;
    month: number;
    year: number;
    timestamp: number;
    dateString: string;
  }

  export interface CalendarTheme {
    backgroundColor?: string;
    calendarBackground?: string;
    textSectionTitleColor?: string;
    textSectionTitleDisabledColor?: string;
    selectedDayBackgroundColor?: string;
    selectedDayTextColor?: string;
    todayTextColor?: string;
    dayTextColor?: string;
    textDisabledColor?: string;
    dotColor?: string;
    selectedDotColor?: string;
    arrowColor?: string;
    disabledArrowColor?: string;
    monthTextColor?: string;
    indicatorColor?: string;
    textDayFontFamily?: string;
    textMonthFontFamily?: string;
    textDayHeaderFontFamily?: string;
    textDayFontWeight?: string;
    textMonthFontWeight?: string;
    textDayHeaderFontWeight?: string;
    textDayFontSize?: number;
    textMonthFontSize?: number;
    textDayHeaderFontSize?: number;
  }

  export interface CalendarProps {
    current?: string;
    minDate?: string;
    maxDate?: string;
    onDayPress?: (day: DayObject) => void;
    markedDates?: Record<string, DayState>;
    markingType?: 'simple' | 'period' | 'multi-dot' | 'custom';
    hideArrows?: boolean;
    hideExtraDays?: boolean;
    theme?: CalendarTheme;
  }

  export const Calendar: React.FC<CalendarProps>;
}
