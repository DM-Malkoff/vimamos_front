import {useEffect} from "react";

const GoToShop = ({prevUrl}) => {
    const shopName = localStorage.getItem('shopName')

    useEffect(() => {
        setTimeout(() => {
            window.location.assign(localStorage.getItem('external-link'))
            window.history.replaceState(null, null, prevUrl);
        }, 1000)
    }, [prevUrl])

    return (
        <div className='transition-text'>
            <div className='loader'>
                <div className="container">
                    <div className="box1">&nbsp;</div>
                    <div className="box2">&nbsp;</div>
                    <div className="box3">&nbsp;</div>
                </div>
            </div>
            <p>Переход на страницу магазина <strong>{shopName}</strong></p>

            <style jsx>{`
                .transition-text{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .transition-text p{

                }
                .loader {
                  padding: 0px;
                  margin: 0px;
                  display:flex;
                  justify-content: center;
                }
                .loader .container {
                  width: 112px;
                  height: 112px;
                }
                .loader .container .box1,
                .container .box2,
                .container .box3 {
                  border: 16px solid #f5f5f5;
                  box-sizing: border-box;
                  position: absolute;
                  display: block;
                }
                .loader .container .box1 {
                  width: 112px;
                  height: 48px;
                  margin-top: 64px;
                  margin-left: 0px;
                  -webkit-animation: anime1 4s 0s forwards ease-in-out infinite;
                          animation: anime1 4s 0s forwards ease-in-out infinite;
                }
                .loader .container .box2 {
                  width: 48px;
                  height: 48px;
                  margin-top: 0px;
                  margin-left: 0px;
                  -webkit-animation: anime2 4s 0s forwards ease-in-out infinite;
                          animation: anime2 4s 0s forwards ease-in-out infinite;
                }
                .loader .container .box3 {
                  width: 48px;
                  height: 48px;
                  margin-top: 0px;
                  margin-left: 64px;
                  -webkit-animation: anime3 4s 0s forwards ease-in-out infinite;
                          animation: anime3 4s 0s forwards ease-in-out infinite;
                }
                @-webkit-keyframes anime1 {
                  0% {
                    width: 112px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                  12.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                  25% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                  37.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                  50% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                  62.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                  75% {
                    width: 48px;
                    height: 112px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  87.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  100% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                }
                @keyframes anime1 {
                  0% {
                    width: 112px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                  12.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                  25% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                  37.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                  50% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                  62.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                  75% {
                    width: 48px;
                    height: 112px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  87.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  100% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                }
                @-webkit-keyframes anime2 {
                  0% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  12.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  25% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  37.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  50% {
                    width: 112px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  62.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                  75% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                  87.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                  100% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                }
                @keyframes anime2 {
                  0% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  12.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  25% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  37.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  50% {
                    width: 112px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 0px;
                  }
                  62.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                  75% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                  87.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                  100% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                }
                @-webkit-keyframes anime3 {
                  0% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                  12.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                  25% {
                    width: 48px;
                    height: 112px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                  37.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 64px;
                  }
                  50% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 64px;
                  }
                  62.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 64px;
                  }
                  75% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 64px;
                  }
                  87.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 64px;
                  }
                  100% {
                    width: 112px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                }
                @keyframes anime3 {
                  0% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                  12.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                  25% {
                    width: 48px;
                    height: 112px;
                    margin-top: 0px;
                    margin-left: 64px;
                  }
                  37.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 64px;
                  }
                  50% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 64px;
                  }
                  62.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 64px;
                  }
                  75% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 64px;
                  }
                  87.5% {
                    width: 48px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 64px;
                  }
                  100% {
                    width: 112px;
                    height: 48px;
                    margin-top: 64px;
                    margin-left: 0px;
                  }
                }

            `}
            </style>
        </div>
    );
};
export default GoToShop;

export async function getServerSideProps(context){
    return {
        props: {
            prevUrl: context.req.headers.referer
        }
    };
}