import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Content from './components/Content';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Header />
      <Content />
      <div className="text-white py-8">
        <div className="mx-auto max-w-[calc(100vw-180px)] px-4">
          <h3 className="text-lg md:text-lg font-bold mb-6">ДОКУМЕНТИ ФОНДУ</h3>
          <div className="flex flex-col gap-4">
            <a 
              href="/Документ_2025-10-31_160213.pdf" 
              download
              className="flex items-center gap-3 text-white hover:text-orange-400 transition-colors"
            >
              <Image src="/file.svg" alt="" width={20} height={20} />
              <span>Виписка.pdf</span>
            </a>
            <a 
              href="/Документ_2025-10-31_160145.pdf" 
              download
              className="flex items-center gap-3 text-white hover:text-orange-400 transition-colors"
            >
              <Image src="/file.svg" alt="" width={20} height={20} />
              <span>Витяг.pdf</span>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
