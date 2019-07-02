import { Box, Column, Row, Text } from '@tpdewolf/styled-system'
import { format, parse } from 'date-fns'
import { useEffect, useState } from 'react'

import { Label } from '@/components/atoms'
import { colors } from '@/theme/colors'

import { FieldInput } from './FieldInput'

export interface FieldDobProps {
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
}

export const FieldDob: React.FC<FieldDobProps> = ({ value, onChange, label, onBlur }) => {
  const initialDate = value && format(parse(value), 'YYYY-MM-DD')
  const [initialYear, initialMonth, initialDay] = (initialDate && initialDate.split('-')) || ''

  const [date, setDate] = useState<string>(initialDate || '')

  const [day, setDay] = useState(initialDay || '')
  const [month, setMonth] = useState(initialMonth || '')
  const [year, setYear] = useState(initialYear || '')

  function onDayBlur() {
    if (day && day.length < 2) {
      setDay(String(day).padStart(2, '0'))
    }

    if (Number(day) > 31) {
      setDay('31')
    }
  }

  function onMonthBlur() {
    if (month && month.length < 2) {
      setMonth(String(month).padStart(2, '0'))
    }

    if (Number(month) > 12) {
      setMonth('12')
    }
  }

  useEffect(() => {
    onChange(date)
  }, [date])

  useEffect(() => {
    if (day && month && year) {
      const dateArray = [year, month, day]
      setDate(dateArray.join('-'))
    } else {
      setDate('')
    }
  }, [day, month, year])

  return (
    <Box position="relative">
      <Label color={colors.grey.medium}>
        <Text>{label}</Text>
      </Label>

      <Row gutter={10}>
        <Column col={3}>
          <FieldInput
            name="day"
            type="number"
            value={day}
            onBlur={onDayBlur}
            onChange={e => setDay(e.currentTarget.value)}
            placeholder="Dag"
            min="1"
            max="31"
          />
        </Column>
        <Column col={4}>
          <FieldInput
            name="month"
            type="number"
            value={month}
            onBlur={onMonthBlur}
            onChange={e => setMonth(e.currentTarget.value)}
            placeholder="Maand"
            min="1"
            max="12"
          />
        </Column>
        <Column col={5}>
          <FieldInput
            name="year"
            value={year}
            onChange={e => setYear(e.currentTarget.value)}
            onBlur={onBlur}
            placeholder="Jaar"
            type="number"
            min="1900"
            max="2018"
          />
        </Column>
      </Row>
    </Box>
  )
}
