'use client'

import React, { useState } from 'react'
import Modal from './Modal'
import { Button } from './Button'

interface QuestionnaireModalProps {
  isOpen: boolean
  onClose: () => void
  vacancyTitle?: string
}

export default function QuestionnaireModal({ isOpen, onClose, vacancyTitle }: QuestionnaireModalProps) {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    patronymic: '',
    phone: '',
    telegram: '',
    isServiceman: '',
    age18to58: false,
    privacyPolicy: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [phoneError, setPhoneError] = useState<string | null>(null)

  // Validate Ukrainian phone number
  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '')
    
    // Ukrainian phone formats:
    // +380XXXXXXXXX (12 digits after +)
    // 380XXXXXXXXX (12 digits)
    // 0XXXXXXXXX (10 digits starting with 0)
    // +38 (0XX) XXX-XX-XX or similar formats
    
    if (digitsOnly.length === 12 && digitsOnly.startsWith('380')) {
      return true
    }
    if (digitsOnly.length === 10 && digitsOnly.startsWith('0')) {
      return true
    }
    if (digitsOnly.length === 9) {
      return true
    }
    
    return false
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Validate phone in real-time
    if (name === 'phone') {
      if (value && !validatePhone(value)) {
        setPhoneError('Введіть коректний номер телефону (наприклад: +380XXXXXXXXX або 0XXXXXXXXX)')
      } else {
        setPhoneError(null)
      }
    }
  }

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.lastName.trim() !== '' &&
      formData.firstName.trim() !== '' &&
      formData.patronymic.trim() !== '' &&
      formData.phone.trim() !== '' &&
      validatePhone(formData.phone) &&
      formData.privacyPolicy &&
      !phoneError
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Validate phone before submission
    if (!validatePhone(formData.phone)) {
      setPhoneError('Введіть коректний номер телефону (наприклад: +380XXXXXXXXX або 0XXXXXXXXX)')
      return
    }
    
    if (!formData.privacyPolicy) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)
    setPhoneError(null)

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          vacancyTitle: vacancyTitle || 'Не вказано',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      setSubmitSuccess(true)
      // Reset form
      setFormData({
        lastName: '',
        firstName: '',
        patronymic: '',
        phone: '',
        telegram: '',
        isServiceman: '',
        age18to58: false,
        privacyPolicy: true,
      })
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose()
        setSubmitSuccess(false)
        setIsSubmitting(false)
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      const errorMessage = error instanceof Error ? error.message : 'Помилка при відправці заявки. Спробуйте ще раз.'
      setSubmitError(errorMessage)
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl">
      <div className="p-6 md:p-8">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase">
          АНКЕТНЕ ОПИТУВАННЯ
        </h2>

        {/* Instructions */}
        <div className="mb-8 space-y-2 text-white text-sm md:text-base">
          <p>
            Для того щоб потрапити до лав III Окремої Штурмової Бригади необхідно подати заявку заповнивши анкету.
          </p>
          <p>
            Для іноземних громадян - інформація за{' '}
            <a href="#" className="text-[#FFBB54] underline hover:text-[#FFBB54]">
              посиланням
            </a>
            .
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" onClick={(e) => e.stopPropagation()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-white text-sm mb-2">
                  Прізвище<span className="text-[#FFBB54]">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Прізвище"
                  required
                  className="w-full bg-[#1c1c1c] border border-white text-white placeholder-gray-500 px-4 py-3 focus:outline-none focus:border-[#FFBB54]"
                />
              </div>

              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-white text-sm mb-2">
                  Ім&apos;я<span className="text-[#FFBB54]">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Ім'я"
                  required
                  className="w-full bg-[#1c1c1c] border border-white text-white placeholder-gray-500 px-4 py-3 focus:outline-none focus:border-[#FFBB54]"
                />
              </div>

              {/* Patronymic */}
              <div>
                <label htmlFor="patronymic" className="block text-white text-sm mb-2">
                  По-батькові<span className="text-[#FFBB54]">*</span>
                </label>
                <input
                  type="text"
                  id="patronymic"
                  name="patronymic"
                  value={formData.patronymic}
                  onChange={handleInputChange}
                  placeholder="По-батькові"
                  required
                  className="w-full bg-[#1c1c1c] border border-white text-white placeholder-gray-500 px-4 py-3 focus:outline-none focus:border-[#FFBB54]"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-white text-sm mb-2">
                  Номер телефону<span className="text-[#FFBB54]">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+380XXXXXXXXX або 0XXXXXXXXX"
                  required
                  className={`w-full bg-[#1c1c1c] border text-white placeholder-gray-500 px-4 py-3 focus:outline-none ${
                    phoneError ? 'border-red-500' : 'border-white focus:border-[#FFBB54]'
                  }`}
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Telegram */}
              <div>
                <label htmlFor="telegram" className="block text-white text-sm mb-2">
                  Нік в телеграмі
                </label>
                <input
                  type="text"
                  id="telegram"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  placeholder="Нік в телеграмі"
                  className="w-full bg-[#1c1c1c] border border-white text-white placeholder-gray-500 px-4 py-3 focus:outline-none focus:border-[#FFBB54]"
                />
              </div>

              {/* Are you currently a serviceman? */}
              <div>
                <label className="block text-white text-sm mb-3">
                  Чи є військовослужбовцем на даний момент?
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center text-white cursor-pointer">
                    <input
                      type="radio"
                      name="isServiceman"
                      value="yes"
                      checked={formData.isServiceman === 'yes'}
                      onChange={handleInputChange}
                      className="mr-2 w-4 h-4 bg-[#1c1c1c] border border-white focus:ring-[#FFBB54] focus:ring-offset-0 appearance-none checked:bg-[#FFBB54] checked:border-[#FFBB54] rounded-full"
                    />
                    Так
                  </label>
                  <label className="flex items-center text-white cursor-pointer">
                    <input
                      type="radio"
                      name="isServiceman"
                      value="no"
                      checked={formData.isServiceman === 'no'}
                      onChange={handleInputChange}
                      className="mr-2 w-4 h-4 bg-[#1c1c1c] border border-white focus:ring-[#FFBB54] focus:ring-offset-0 appearance-none checked:bg-[#FFBB54] checked:border-[#FFBB54] rounded-full"
                    />
                    Ні
                  </label>
                </div>
              </div>

              {/* Age checkbox */}
              <div>
                <label className="flex items-center text-white cursor-pointer">
                  <input
                    type="checkbox"
                    name="age18to58"
                    checked={formData.age18to58}
                    onChange={handleInputChange}
                    className="mr-2 w-4 h-4 bg-[#1c1c1c] border border-white focus:ring-[#FFBB54] focus:ring-offset-0 appearance-none checked:bg-[#FFBB54] checked:border-[#FFBB54] relative"
                    style={{
                      backgroundImage: formData.age18to58 
                        ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M4 8l2 2 6-6'/%3E%3C/svg%3E\")"
                        : 'none',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                  Мені від 18 до 58 років
                </label>
              </div>

              {/* Privacy Policy checkbox */}
              <div>
                <label className="text-white cursor-pointer">
                  <input
                    type="checkbox"
                    name="privacyPolicy"
                    checked={formData.privacyPolicy}
                    onChange={handleInputChange}
                    required
                    className="mr-2 w-4 h-4 bg-[#1c1c1c] border border-white focus:ring-[#FFBB54] focus:ring-offset-0 appearance-none checked:bg-[#FFBB54] checked:border-[#FFBB54] relative"
                    style={{
                      backgroundImage: formData.privacyPolicy 
                        ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M4 8l2 2 6-6'/%3E%3C/svg%3E\")"
                        : 'none',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                  Натискаючи кнопку нижче щоб продовжити ви погоджуєтесь з нашою{' '}
                  <a href="#" className="text-[#FFBB54] underline hover:text-[#FFBB54]">
                    Політикою конфіденційності
                  </a>
                </label>
              </div>
            </div>
          </div>

          {/* Error/Success Messages */}
          {submitError && (
            <div className="text-red-500 text-sm text-center pt-2">
              {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className="text-green-500 text-sm text-center pt-2">
              Заявку успішно відправлено!
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              variant="secondary"
              size="default"
              className="uppercase"
              disabled={isSubmitting || !isFormValid()}
              onClick={(e) => e.stopPropagation()}
            >
              {isSubmitting ? 'ВІДПРАВЛЯЄТЬСЯ...' : 'ВІДПРАВИТИ ЗАЯВКУ'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

