'use client'

import React, { useState } from 'react'
import Modal from './Modal'
import { Button } from './Button'

interface QuestionnaireModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuestionnaireModal({ isOpen, onClose }: QuestionnaireModalProps) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    onClose()
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
        <form onSubmit={handleSubmit} className="space-y-6">
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
                  Ім'я<span className="text-[#FFBB54]">*</span>
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
                  placeholder="+38 (0__) ______"
                  required
                  className="w-full bg-[#1c1c1c] border border-white text-white placeholder-gray-500 px-4 py-3 focus:outline-none focus:border-[#FFBB54]"
                />
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

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              variant="secondary"
              size="default"
              className="uppercase"
            >
              ВІДПРАВИТИ ЗАЯВКУ
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

