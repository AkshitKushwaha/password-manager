import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-purple-800 flex justify-between items-center px-10 h-14">
        <div class="logo font-bold text-white hover:text-blue-900">Passcard</div>
      <ul>
        <li className="flex gap-4">
            <a href="/" className="text-white hover:font-bold">Home</a>
            <a href="" className="text-white hover:font-bold">About</a>
            <a href="" className="text-white hover:font-bold">Contact</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
