import RegisterForm from '@/components/RegisterForm'
import ShineBorder from '@/components/ui/shine-border'
import React from 'react'

function register() {
  return (
    <div className="flex justify-center items-center py-56">
      <ShineBorder
        className="flex h-[700px] items-center justify-center rounded-lg border-none bg-gray-950 md:shadow-xl"
        color={["#5c2ed1", "#c40446", "#710e87"]}
      >
        <RegisterForm />
      </ShineBorder>
    </div>
  )
}

export default register