import { Newsletter } from './Newsletter';

interface FooterProps {
  variant?: 'dark' | 'light';
}

export function Footer({ variant = 'dark' }: FooterProps) {
  const isDark = variant === 'dark';

  const imgSrc = isDark ? '/eeg-logo-white.svg' : '/eeg-logo.svg';
  const bgColor = isDark ? 'bg-[#1a1a1a]' : 'bg-[#F7F3EE]';
  const textColor = isDark ? 'text-white' : 'text-black';
  const textMutedColor = isDark ? 'text-white/80' : 'text-black/70';
  const textHoverColor = isDark ? 'hover:text-white' : 'hover:text-black';
  const iconFill = isDark ? 'white' : 'black';

  return (
    <footer className={`${bgColor} px-[80px] py-12`}>
      <div className="flex items-start justify-between">
        {/* Logo */}
        <a href="/">
          <img src={`${imgSrc}`} alt="EEG" className="h-[44px]" />
        </a>

        {/* Links Columns */}
        <div className="flex gap-24">
          {/* Programs */}
          <div className="flex flex-col gap-2">
            <h4 className={`${textColor} font-medium text-lg`}>/programs</h4>
            <a href="/programs/startup" className={`${textMutedColor} ${textHoverColor} transition-colors`}>/startup</a>
            <a href="/programs/investing" className={`${textMutedColor} ${textHoverColor} transition-colors`}>/investing</a>
            <a href="/programs/eir" className={`${textMutedColor} ${textHoverColor} transition-colors`}>/eir</a>
          </div>

          {/* People */}
          <div className="flex flex-col gap-2">
            <h4 className={`${textColor} font-medium text-lg`}>/people</h4>
            <a href="/people" className={`${textMutedColor} ${textHoverColor} transition-colors`}>/community</a>
            <a href="/people#leadership-spring-26" className={`${textMutedColor} ${textHoverColor} transition-colors`}>/leadership</a>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4">
            <h4 className={`${textColor} font-medium text-lg`}>/socials</h4>
            <div className="flex items-center gap-4">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/nyueeg/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-70 transition-opacity">
                <svg className="size-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33.3333 5H6.66667C5.74619 5 5 5.74619 5 6.66667V33.3333C5 34.2538 5.74619 35 6.66667 35H33.3333C34.2538 35 35 34.2538 35 33.3333V6.66667C35 5.74619 34.2538 5 33.3333 5ZM14.1667 30H9.16667V16.6667H14.1667V30ZM11.6667 14.1667C10.0983 14.1667 8.83333 12.9017 8.83333 11.3333C8.83333 9.765 10.0983 8.5 11.6667 8.5C13.235 8.5 14.5 9.765 14.5 11.3333C14.5 12.9017 13.235 14.1667 11.6667 14.1667ZM30.8333 30H25.8333V23.3333C25.8333 21.4917 25.8 19.1667 23.3333 19.1667C20.8333 19.1667 20.5 21.1667 20.5 23.1667V30H15.5V16.6667H20.3333V18.8333H20.4C21.0667 17.5667 22.7333 16.2333 25.2333 16.2333C30.3 16.2333 30.8333 19.5333 30.8333 23.8333V30Z" fill={iconFill}/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a href="https://x.com/nyueeg" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:opacity-70 transition-opacity">
                <svg className="size-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.6875 6.25H34.3125L23.6562 18.4375L36.25 33.75H26.25L18.5938 23.9062L9.84375 33.75H5.15625L16.5625 20.625L4.375 6.25H14.6875L21.5625 15.1562L29.6875 6.25ZM27.8125 30.9375H30.3125L12.8125 8.75H10.1562L27.8125 30.9375Z" fill={iconFill}/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/nyu.eeg/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70 transition-opacity">
                <svg className="size-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 10.625C16.875 10.625 16.4844 10.6406 15.2656 10.6969C14.0469 10.7531 13.2031 10.9531 12.4531 11.25C11.6875 11.5469 11.0156 11.9844 10.4375 12.5625C9.85938 13.1406 9.42188 13.8125 9.125 14.5781C8.82812 15.3281 8.62813 16.1719 8.57188 17.3906C8.51563 18.6094 8.5 19 8.5 22.125C8.5 25.25 8.51563 25.6406 8.57188 26.8594C8.62813 28.0781 8.82812 28.9219 9.125 29.6719C9.42188 30.4375 9.85938 31.1094 10.4375 31.6875C11.0156 32.2656 11.6875 32.7031 12.4531 33C13.2031 33.2969 14.0469 33.4969 15.2656 33.5531C16.4844 33.6094 16.875 33.625 20 33.625C23.125 33.625 23.5156 33.6094 24.7344 33.5531C25.9531 33.4969 26.7969 33.2969 27.5469 33C28.3125 32.7031 28.9844 32.2656 29.5625 31.6875C30.1406 31.1094 30.5781 30.4375 30.875 29.6719C31.1719 28.9219 31.3719 28.0781 31.4281 26.8594C31.4844 25.6406 31.5 25.25 31.5 22.125C31.5 19 31.4844 18.6094 31.4281 17.3906C31.3719 16.1719 31.1719 15.3281 30.875 14.5781C30.5781 13.8125 30.1406 13.1406 29.5625 12.5625C28.9844 11.9844 28.3125 11.5469 27.5469 11.25C26.7969 10.9531 25.9531 10.7531 24.7344 10.6969C23.5156 10.6406 23.125 10.625 20 10.625ZM20 12.6875C23.0625 12.6875 23.4219 12.7031 24.625 12.7594C25.7344 12.8125 26.3438 13.0031 26.7469 13.1656C27.2812 13.3813 27.6719 13.6406 28.0781 14.0469C28.4844 14.4531 28.7438 14.8438 28.9594 15.3781C29.1219 15.7813 29.3125 16.3906 29.3656 17.5C29.4219 18.7031 29.4375 19.0625 29.4375 22.125C29.4375 25.1875 29.4219 25.5469 29.3656 26.75C29.3125 27.8594 29.1219 28.4688 28.9594 28.8719C28.7438 29.4062 28.4844 29.7969 28.0781 30.2031C27.6719 30.6094 27.2812 30.8688 26.7469 31.0844C26.3438 31.2469 25.7344 31.4375 24.625 31.4906C23.4219 31.5469 23.0625 31.5625 20 31.5625C16.9375 31.5625 16.5781 31.5469 15.375 31.4906C14.2656 31.4375 13.6562 31.2469 13.2531 31.0844C12.7188 30.8688 12.3281 30.6094 11.9219 30.2031C11.5156 29.7969 11.2562 29.4062 11.0406 28.8719C10.8781 28.4688 10.6875 27.8594 10.6344 26.75C10.5781 25.5469 10.5625 25.1875 10.5625 22.125C10.5625 19.0625 10.5781 18.7031 10.6344 17.5C10.6875 16.3906 10.8781 15.7813 11.0406 15.3781C11.2562 14.8438 11.5156 14.4531 11.9219 14.0469C12.3281 13.6406 12.7188 13.3813 13.2531 13.1656C13.6562 13.0031 14.2656 12.8125 15.375 12.7594C16.5781 12.7031 16.9375 12.6875 20 12.6875ZM20 16.375C17.0938 16.375 14.75 18.7188 14.75 21.625C14.75 24.5312 17.0938 26.875 20 26.875C22.9062 26.875 25.25 24.5312 25.25 21.625C25.25 18.7188 22.9062 16.375 20 16.375ZM20 24.8125C18.2344 24.8125 16.8125 23.3906 16.8125 21.625C16.8125 19.8594 18.2344 18.4375 20 18.4375C21.7656 18.4375 23.1875 19.8594 23.1875 21.625C23.1875 23.3906 21.7656 24.8125 20 24.8125ZM27.5469 16.1406C27.5469 16.8906 26.9375 17.5 26.1875 17.5C25.4375 17.5 24.8281 16.8906 24.8281 16.1406C24.8281 15.3906 25.4375 14.7812 26.1875 14.7812C26.9375 14.7812 27.5469 15.3906 27.5469 16.1406Z" fill={iconFill}/>
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className={`${textColor} font-medium text-lg`}>/newsletter</h4>
            <Newsletter variant={variant} />
          </div>
        </div>
      </div>
    </footer>
  );
}
