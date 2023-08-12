/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import './Login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import './SiteBar.css'
export default function LoginPage() {
    const [open, setOpen] = useState(true)
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [email1, setEmail1] = useState('')
    const [phone, setPhone] = useState('')
    const [sitebar, setSiteBar] = useState(false)
    const [email, setEmail] = useState("");
    const pattern = /^\d+$/;
    const pattern2 = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    function run() {
        if (phone.length === 12 && pattern.test(phone) && pass.length > 4 && emailRegex.test(email1))
            setSiteBar(true)
        var users = [{
            phone: phone,
            email: email1,
            password: pass
        }]
        localStorage.setItem('users', JSON.stringify(users))
        setTimeout(()=>setSiteBar(false), 2000)
    }
    const users = JSON.parse(localStorage.getItem('users'))
    function sendd(){
       if(users.length > 0){
        users.map((iteam)=>{
            if(iteam.password === pass2 && iteam.phone === email){
            setSiteBar(true)
            setTimeout(()=>setSiteBar(false), 3000)
            }
        })
       }
    }
    return (
        <div className='Login'>
            {
                (open) ? <div className='login_app row'>
                    <label htmlFor="">Email</label>
                    <input placeholder='ergasevaziz0611@gmail.com' className='input_4' onChange={(i) => { setEmail1(i.target.value) }} type="text" />
                    <label htmlFor="">Phone Number</label>
                    <input placeholder='+998335917636' pattern='[0-9]*' className='input_4' onChange={(i) => { setPhone(i.target.value) }} type="text" />
                    <label htmlFor="ssd">Password</label>
                    <input placeholder='password' about='ssd' className='input_4' onChange={(i) => { setPass(i.target.value) }} type="password" />
                    <div className='Login__btn'> <Link className='btnn' to={`${(sitebar) ? '/' : ''}`}><button onClick={() => run()}>Создать аккаунт</button></Link>
                        <button onClick={()=>setOpen(false)}>Войти</button></div>
                </div> : <div className='sing_app row'>       
                        <label htmlFor="">Phone Number</label>
                        <input  placeholder='ergasevaziz0611@gmail.com' className='input_4' onChange={(i) => { setEmail(i.target.value) }} type="text" />
                        <label htmlFor="">Password</label>
                        <input  placeholder='password' className='input_4' onChange={(i) => { setPass2(i.target.value) }} type="text" />
                    <div className='Login__btn'>
                     <button  onClick={() => setOpen(true)}>Создать аккаунт</button>
                     <Link onClick={()=>sendd()} className='btnn' to={`${(sitebar) ? '/' : ''}`}><button> Войти</button></Link>
                    </div>
                </div>
            }
        </div>
    )
}
