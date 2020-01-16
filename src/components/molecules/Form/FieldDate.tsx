import { Box } from '@tpdewolf/styled-primitives'
import { format, isValid, parse, parseISO } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'
import Calendar, { OnChangeDateCallback } from 'react-calendar/dist/entry.nostyle'
import useClickAway from 'react-use/lib/useClickAway'
import styled from 'styled-components'

import { colors } from '@/theme/colors'
import { Omit } from '@/utils/types'

import { FieldInput, FieldInputProps } from './FieldInput'

export type FieldDateProps = Omit<FieldInputProps, 'onChange' | 'value'> & {
  value?: string | undefined
  onChange: (date: string) => void
  onClose?: () => void
}

const CalendarWrapper = styled(Box)`
  z-index: 1;
`

export const FieldDate: React.FC<FieldDateProps> = ({ value, onChange, onClose, ...props }) => {
  const outputFormat = 'yyyy-MM-dd'
  const inputFormat = 'dd-MM-yyyy'

  const [date, setDate] = useState<Date | undefined>(value ? parseISO(value) : undefined)
  const [outputDate, setOutputDate] = useState(date ? format(date, outputFormat) : '')
  const [inputDate, setInputDate] = useState(date ? format(date, inputFormat) : '')
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useClickAway(ref, () => {
    if (isOpen) {
      setIsOpen(false)
      if (onClose) {
        onClose()
      }
    }
  })

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    setIsOpen(true)

    if (props.onFocus) {
      props.onFocus(e)
    }
  }

  useEffect(() => {
    onChange(outputDate)
  }, [onChange, outputDate])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.currentTarget.value
    setInputDate(inputValue)

    const parsedDate = parse(inputValue, 'dd-MM-yyyy', new Date())

    if (isValid(parsedDate)) {
      setOutputDate(format(parsedDate, outputFormat))
      setDate(parsedDate)
    } else {
      setOutputDate('')
      setDate(undefined)
    }
  }

  const handleCalendarChange: OnChangeDateCallback = newDate => {
    if (!Array.isArray(newDate)) {
      setDate(newDate)
      setInputDate(format(newDate, inputFormat))
      setOutputDate(format(newDate, outputFormat))
      setIsOpen(false)
    }
  }

  return (
    <Wrapper position="relative" ref={ref}>
      <FieldInput
        autoComplete={'off'}
        {...props}
        value={inputDate}
        onFocus={handleFocus}
        onChange={handleInputChange}
      />
      <CalendarWrapper display={isOpen ? 'block' : 'none'} position="absolute">
        <Calendar locale="nl" value={date} onChange={handleCalendarChange} />
      </CalendarWrapper>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: white;
    border: 1px solid ${colors.grey.lighter};
    line-height: 1.125em;
    abbr[title] {
      text-decoration: none;
    }
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers {
    font-weight: bold;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }
  .react-calendar__month-view__days__day--weekend {
    color: ${colors.error};
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${colors.grey.light};
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
  }
  .react-calendar__tile:disabled {
    background-color: #fff;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: ${colors.grey.lighter};
  }
  .react-calendar__tile--hasActive {
    background: ${colors.primary};
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: ${colors.primary};
  }
  .react-calendar__tile--active {
    background: ${colors.primary};
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${colors.primary};
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: ${colors.grey.lighter};
  }
`
