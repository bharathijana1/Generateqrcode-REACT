import React, { useState } from 'react'

// https://api.qrserver.com/v1/create-qr-code?size=150X150&data=bharathi

export default function QRCode() {
    const [ img, setImg ] = useState();
    const [ loading, setLoading ] = useState(false);
    const [ qrData, setQrData ] = useState("https://youtube.com/");
    const [ qrsize, setQrsize ] = useState("150");

    async function generateqrcode() {
        setLoading(true);
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}X${qrsize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }
    function downloadqrcode(){
        fetch(img)
        .then((response) => response.blob())
        .then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            console.log("downloading qr code", error);
            
        })
    }
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='p-5 text-xl font-medium uppercase text-cyan-800'>QR Code Generator</h1>
        {
            loading && <p>Please wait....</p>
        }
        {
            img && <img src={img}  alt="QR Code Image" className='border border-black' />
        }
        

        <div className='py-10 md:p-10 w-full md:w-3/4 lg:w-3/5'>
        <div className='flex items-start md:items-center justify-center flex-col md:flex-row'>
            <label htmlFor="qrcode" className='text-lg md:text-xl w-52 m-2 font-medium'>
                Data for QR code
            </label>
            <input type="text" id="qrcode" className='border text-lg p-2 w-full md:w-3/4 lg:w-1/2 m-1' placeholder='Enter data for QR code' 
            value={qrData}
            onChange={(e)=> setQrData(e.target.value)}
             />
        </div>
        
        <div className='flex items-start md:items-center justify-center flex-col md:flex-row'>
            <label htmlFor="imagesize" className='text-lg md:text-xl font-medium w-52 m-2'>
                Image size (e.g., 150)
            </label>
            <input type="text" id="imagesize" className='border text-lg p-2 w-full md:w-3/4 lg:w-1/2 m-1' placeholder='Enter image size'
            value={qrsize}
            onChange={(e)=> setQrsize(e.target.value)}
             />
        </div>
        </div>

        <div className='flex space-x-2'>
            <button className='bg-cyan-800 hover:bg-cyan-900 px-5 p-2 text-lg text-white m-1' onClick={generateqrcode} disabled={loading} >
                Generate QR code
            </button>
            <button className='bg-cyan-800 hover:bg-cyan-900 px-5 p-2 text-lg text-white m-1 ' onClick={downloadqrcode}>
                Download QR code
            </button>
        </div>
    </div>
  )
}
