import React, {
    useMemo,
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef,
} from 'react';
import {
    Autocomplete,
    TextField,
    Box,
    Avatar,
    Typography,
    ListSubheader,
    useTheme,
    CircularProgress,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { getAllSchools } from '../../utils/schoolApi';
import type { School } from '../../utils/schoolApi';

/**
 * Methods exposed via ref for uncontrolled components
 */
export interface SchoolAutocompleteHandle {
    /**
     * Get the current selected school value
     */
    getValue: () => School | null;
    /**
     * Set the selected school value programmatically
     */
    setValue: (school: School | null) => void;
    /**
     * Reset the selection to null
     */
    reset: () => void;
}

export interface SchoolAutocompleteProps {
    /**
     * Controlled value. If provided, component is controlled.
     * If omitted, component manages its own state.
     */
    value?: School | null;
    /**
     * Callback fired when the value changes.
     * Required if using controlled mode (value prop provided).
     */
    onChange?: (school: School | null) => void;
    /**
     * Default value for uncontrolled mode.
     * Ignored if value prop is provided.
     */
    defaultValue?: School | null;
    /**
     * Optional: if provided, uses this instead of fetching
     */
    schools?: School[];
    placeholder?: string;
    label?: string;
    width?: string | number;
    height?: string | number;
    sx?: SxProps<Theme>;
    disabled?: boolean;
    size?: 'small' | 'medium';
    /**
     * Optional: filter schools by conference
     */
    filterByConference?: string;
}

const SchoolAutocomplete = forwardRef<
    SchoolAutocompleteHandle,
    SchoolAutocompleteProps
>(
    (
        {
            value: controlledValue,
            onChange: controlledOnChange,
            defaultValue,
            schools: providedSchools,
            placeholder = 'Search for school...',
            label,
            width,
            height,
            sx,
            disabled = false,
            size = 'small',
            filterByConference,
        },
        ref
    ) => {
        const theme = useTheme();
        const [schools, setSchools] = useState<School[]>(providedSchools || []);
        const [loading, setLoading] = useState(!providedSchools);
        const [error, setError] = useState<string | null>(null);

        // Internal state for uncontrolled mode
        const [internalValue, setInternalValue] = useState<School | null>(
            defaultValue ?? null
        );

        // Determine if component is controlled
        const isControlled = controlledValue !== undefined;
        const value = isControlled ? controlledValue : internalValue;

        // Expose methods via ref for uncontrolled components
        useImperativeHandle(ref, () => ({
            getValue: () => value,
            setValue: (school: School | null) => {
                if (isControlled) {
                    console.warn(
                        'setValue called on controlled component. Use onChange prop instead.'
                    );
                    controlledOnChange?.(school);
                } else {
                    setInternalValue(school);
                }
            },
            reset: () => {
                if (isControlled) {
                    controlledOnChange?.(null);
                } else {
                    setInternalValue(null);
                }
            },
        }));

        // Fetch schools from API if not provided
        useEffect(() => {
            if (!providedSchools) {
                const fetchSchools = async () => {
                    try {
                        setLoading(true);
                        setError(null);
                        const fetchedSchools = await getAllSchools({
                            conference: filterByConference,
                            isActive: true,
                        });
                        setSchools(fetchedSchools);
                    } catch (err) {
                        setError(
                            err instanceof Error
                                ? err.message
                                : 'Failed to load schools'
                        );
                        console.error('Error fetching schools:', err);
                    } finally {
                        setLoading(false);
                    }
                };
                fetchSchools();
            }
        }, [providedSchools, filterByConference]);

        // Group schools by conference
        const schoolsByConference = useMemo(() => {
            const grouped: Record<string, School[]> = {};

            schools.forEach((school) => {
                const conference = school.conference || 'Other';
                if (!grouped[conference]) {
                    grouped[conference] = [];
                }
                grouped[conference].push(school);
            });

            // Sort conferences alphabetically
            const sortedConferences = Object.keys(grouped).sort();
            const sortedGrouped: Record<string, School[]> = {};

            sortedConferences.forEach((conf) => {
                sortedGrouped[conf] = grouped[conf].sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
            });

            return sortedGrouped;
        }, [schools]);

        // Flatten for Autocomplete options
        const options = useMemo(() => {
            const result: (School | string)[] = [];

            Object.keys(schoolsByConference).forEach((conference) => {
                result.push(conference); // Conference header
                result.push(...schoolsByConference[conference]);
            });

            return result;
        }, [schoolsByConference]);

        const isOptionString = (option: School | string): option is string => {
            return typeof option === 'string';
        };

        const getOptionLabel = (option: School | string): string => {
            if (isOptionString(option)) {
                return option;
            }
            return option.name;
        };

        const renderOption = (
            props: React.HTMLAttributes<HTMLLIElement>,
            option: School | string
        ) => {
            if (isOptionString(option)) {
                // Render conference header
                return (
                    <ListSubheader
                        key={option}
                        component="div"
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            fontWeight: 'bold',
                            // fontSize: '0.875rem',
                            color: theme.palette.primary.main,
                        }}
                    >
                        {option}
                    </ListSubheader>
                );
            }

            // Render school option
            return (
                <Box
                    component="li"
                    {...props}
                    key={option._id || option.name}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        py: 0.5,
                    }}
                >
                    <Avatar
                        src={option.icon}
                        alt={option.name}
                        sx={{
                            width: 48,
                            height: 48,
                        }}
                        variant="rounded"
                    />
                    <Typography
                        variant="body2"
                        sx={{ ml: 1 }}
                    >
                        {option.name}
                    </Typography>
                    {option.mascot && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.grey[500],
                                fontStyle: 'italic',
                                ml: 1,
                            }}
                        >
                            {option.mascot}
                        </Typography>
                    )}
                </Box>
            );
        };

        const groupBy = () => {
            // Return empty string to disable default grouping, we handle it manually
            return '';
        };

        const filterOptions = (
            options: (School | string)[],
            { inputValue }: { inputValue: string }
        ) => {
            if (!inputValue) {
                return options;
            }

            const searchValue = inputValue.toLowerCase();
            const filtered: (School | string)[] = [];

            Object.keys(schoolsByConference).forEach((conference) => {
                const matchingSchools = schoolsByConference[conference].filter(
                    (school) =>
                        school.name.toLowerCase().includes(searchValue) ||
                        school.mascot?.toLowerCase().includes(searchValue) ||
                        school.city.toLowerCase().includes(searchValue) ||
                        school.state.toLowerCase().includes(searchValue)
                );

                if (matchingSchools.length > 0) {
                    filtered.push(conference);
                    filtered.push(...matchingSchools);
                }
            });

            return filtered;
        };

        const getOptionDisabled = (option: School | string) => {
            return isOptionString(option);
        };

        const isOptionEqualToValue = (
            option: School | string,
            val: School | string | null
        ) => {
            if (!val || isOptionString(option) || isOptionString(val)) {
                return false;
            }
            return option._id === val._id || option.name === val.name;
        };

        // Calculate listbox max height based on provided height or default
        const listboxMaxHeight = useMemo(() => {
            if (height) {
                if (typeof height === 'number') {
                    return `${height}px`;
                }
                return height;
            }
            return '400px';
        }, [height]);

        return (
            <Box
                sx={{
                    width: width || '100%',
                    height: height || 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Autocomplete
                    value={value}
                    onChange={(_, newValue) => {
                        const selectedSchool =
                            newValue && !isOptionString(newValue)
                                ? newValue
                                : null;

                        if (isControlled) {
                            // Controlled mode: call onChange prop
                            controlledOnChange?.(selectedSchool);
                        } else {
                            // Uncontrolled mode: update internal state
                            setInternalValue(selectedSchool);
                        }
                    }}
                    options={options}
                    getOptionLabel={getOptionLabel}
                    renderOption={renderOption}
                    groupBy={groupBy}
                    filterOptions={filterOptions}
                    getOptionDisabled={getOptionDisabled}
                    isOptionEqualToValue={isOptionEqualToValue}
                    disabled={disabled || loading}
                    loading={loading}
                    size={size}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={placeholder}
                            label={label}
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: value ? (
                                    <Avatar
                                        src={value.icon}
                                        alt={value.name}
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            marginRight: 1,
                                        }}
                                        variant="rounded"
                                    />
                                ) : loading ? (
                                    <CircularProgress
                                        size={20}
                                        sx={{ mr: 1 }}
                                    />
                                ) : null,
                            }}
                            error={!!error}
                            helperText={error}
                        />
                    )}
                    sx={{
                        width: '100%',
                        ...sx,
                    }}
                    ListboxProps={{
                        style: {
                            maxHeight: listboxMaxHeight,
                            overflowY: 'auto',
                        },
                    }}
                />
            </Box>
        );
    }
);

SchoolAutocomplete.displayName = 'SchoolAutocomplete';

export default SchoolAutocomplete;
