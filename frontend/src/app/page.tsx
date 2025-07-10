import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Content from './components/Content';

export default function Home() {
  return (
    <div className='bg-[#101010]'>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
