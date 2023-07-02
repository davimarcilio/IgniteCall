import { Calendar } from '@/components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import { useState } from 'react'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { Availability } from '@/models/interfaces/Availability'

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  // const [availability, setAvailability] = useState<Availability | null>(null)

  const router = useRouter()

  const username = String(router.query.username)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const { data } = await api.get<Availability>(
        `/users/${username}/availability`,
        {
          params: {
            date: selectedDateWithoutTime,
          },
        },
      )
      return data
    },
    {
      enabled: !!selectedDate,
    },
  )

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate).set('hour', hour).startOf('hour')

    onSelectDateTime(dateWithTime.toDate())
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar onDateSelected={setSelectedDate} selectedDate={selectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem
                  onClick={() => handleSelectTime(hour)}
                  key={hour}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
