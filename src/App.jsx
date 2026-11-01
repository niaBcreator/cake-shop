
import { useState } from 'react'
import './App.css'

function App() {
  const [page, setPage] = useState('home')
  const [slide, setSlide] = useState(1)

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const [weight, setWeight] = useState('')
  const [flavor, setFlavor] = useState('')
  const [fillings, setFillings] = useState([])
  const [toppings, setToppings] = useState([])
  const [day, setDay] = useState('')
  const [notes, setNotes] = useState('')

  const days = [
    'شنبه',
    'یکشنبه',
    'دوشنبه',
    'سه‌شنبه',
    'چهارشنبه',
    'پنجشنبه',
    'جمعه',
  ]

  const fillingOptions = ['موز', 'گردو', 'کرم کارامل', 'آناناس']
  const toppingOptions = [
    'خامه شکلاتی',
    'خامه وانیلی',
    'خامه نسکافه‌ای',
  ]

  const handleSignup = (e) => {
    e.preventDefault()
    setError('')

    if (!/^09\d{9}$/.test(phone)) {
      setError('لطفا شماره موبایل معتبر وارد کنید.')
      return
    }

    if (password.length < 8) {
      setError('رمز عبور باید حداقل ۸ کاراکتر باشد.')
      return
    }

    if (password !== confirmPassword) {
      setError('رمزهای عبور با هم مطابقت ندارند.')
      return
    }

    setSlide(1)
    setPage('order')
  }

  const toggleOption = (option, selected, setSelected) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option))
    } else {
      setSelected([...selected, option])
    }
  }

  const canContinue = () => {
    if (slide === 1) return Number(weight) > 0
    if (slide === 2) return flavor !== ''
    if (slide === 3) return fillings.length > 0
    if (slide === 4) return toppings.length > 0
    if (slide === 5) return day !== ''
    return true
  }

  const nextSlide = () => {
    if (slide < 6) {
      setSlide(slide + 1)
    } else {
      setPage('summary')
    }
  }

  const previousSlide = () => {
    if (slide > 1) {
      setSlide(slide - 1)
    } else {
      setPage('signup')
    }
  }

  return (
    <main dir="rtl">

      {/* Homepage */}
      {page === 'home' && (
        <section className="home">
          <h1>قنادی کمالی</h1>
          <p>کیک دلخواه خود را سفارش دهید.</p>

          <button
            className="order-button"
            onClick={() => setPage('signup')}
          >
            برای ثبت سفارش کلیک کنید
          </button>
        </section>
      )}

      {/* Signup */}
      {page === 'signup' && (
        <section className="signup-page">
          <h1>ایجاد حساب کاربری</h1>

          <form className="signup-form" onSubmit={handleSignup}>
            <label>شماره موبایل:</label>
            <input
              type="tel"
              placeholder="09..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label>رمز عبور:</label>
            <input
              type="password"
              placeholder="حداقل ۸ کاراکتر"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>تکرار رمز عبور:</label>
            <input
              type="password"
              placeholder="رمز عبور را دوباره وارد کنید"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" className="submit-button">
              ادامه
            </button>
          </form>
        </section>
      )}

      {/* Cake ordering */}
      {page === 'order' && (
        <section className="order-page">
          <p className="slide-counter">مرحله {slide} از ۶</p>

          {/* Slide 1: Weight */}
          {slide === 1 && (
            <div>
              <h2 className="question">کیک شما چند کیلو باشد؟</h2>

              <div className="weight-input">
                <input
                  type="number"
                  min="1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <span>کیلو</span>
              </div>
            </div>
          )}

          {/* Slide 2: Sponge flavor */}
          {slide === 2 && (
            <div>
              <h2 className="question">
                طعم اسفنج کیک خود را انتخاب کنید.
              </h2>

              <div className="flavor-options">
                {['شکلاتی', 'وانیلی'].map((option) => (
                  <button
                    key={option}
                    className={`option ${flavor === option ? 'selected' : ''}`}
                    onClick={() => setFlavor(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Slide 3: Fillings */}
          {slide === 3 && (
            <div>
              <h2 className="question">
                مغز کیک شما شامل چه باشد؟
              </h2>

              <div className="options">
                {fillingOptions.map((option) => (
                  <button
                    key={option}
                    className={`option ${fillings.includes(option) ? 'selected' : ''}`}
                    onClick={() =>
                      toggleOption(option, fillings, setFillings)
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Slide 4: Toppings */}
          {slide === 4 && (
            <div>
              <h2 className="question">
                تاپینگ کیک شما چه باشد؟
              </h2>

              <div className="options">
                {toppingOptions.map((option) => (
                  <button
                    key={option}
                    className={`option ${toppings.includes(option) ? 'selected' : ''}`}
                    onClick={() =>
                      toggleOption(option, toppings, setToppings)
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Slide 5: Delivery day */}
          {slide === 5 && (
            <div>
              <h2 className="question">
                کیک خود را برای چه روزی می خواهید؟
              </h2>

              <div className="options days">
                {days.map((option) => (
                  <button
                    key={option}
                    className={`option ${day === option ? 'selected' : ''}`}
                    onClick={() => setDay(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Slide 6: Notes */}
          {slide === 6 && (
            <div className="notes-question">
              <h2 className="question">
                لطفا در صورتی که توضیحی دارید اضافه کنید:
              </h2>

              <textarea
                rows="5"
                maxLength="300"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="توضیحات شما..."
              />

              <p className="word-count">
                {notes.trim() ? notes.trim().split(/\s+/).length : 0} از ۳۰۰ کلمه
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="navigation">
            <button className="back-button" onClick={previousSlide}>
              مرحله قبل
            </button>

            <button
              className="submit-button"
              onClick={nextSlide}
              disabled={!canContinue()}
            >
              {slide === 6 ? 'پایان ثبت سفارش' : 'مرحله بعد'}
            </button>
          </div>
        </section>
      )}

      {/* Order summary */}
      {page === 'summary' && (
        <section className="summary-page">
          <h1>خلاصه سفارش شما</h1>

          <div className="summary-card">
            <div className="summary-item">
              <strong>وزن کیک:</strong>
              <span>{weight} کیلو</span>
            </div>

            <div className="summary-item">
              <strong>طعم اسفنج:</strong>
              <span>{flavor}</span>
            </div>

            <div className="summary-item">
              <strong>مغز کیک:</strong>
              <span>{fillings.join('، ')}</span>
            </div>

            <div className="summary-item">
              <strong>تاپینگ:</strong>
              <span>{toppings.join('، ')}</span>
            </div>

            <div className="summary-item">
              <strong>روز مورد نظر:</strong>
              <span>{day}</span>
            </div>

            <div className="summary-item">
              <strong>توضیحات:</strong>
              <span>{notes || 'بدون توضیحات'}</span>
            </div>
          </div>

          <button
            className="back-button"
            onClick={() => {
              setSlide(6)
              setPage('order')
            }}
          >
            ویرایش سفارش
          </button>

          <p className="hint">
            این سفارش هنوز برای قنادی ارسال نشده است.
          </p>

          <button
            className="submit-button"
            onClick={() => setPage('confirmation')}
          >
            نهایی کردن سفارش
          </button>
        </section>
      )}

      {/* Confirmation */}
      {page === 'confirmation' && (
        <section className="summary-page">
          <h1>سفارش شما نهایی شد!</h1>
          <p>از انتخاب قنادی کمالی سپاسگزاریم.</p>
        </section>
      )}

    </main>
  )
}

export default App
