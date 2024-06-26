import '../../../styles/player.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import s from './GwerhTheBard.module.css';
import logo from '../../../assets/images/png/gtb-logo.png'
import icontales from '../../../assets/images/png/icon-tales.png';
import iconwhoru from '../../../assets/images/png/icon-whoru.png';
import iconquest from '../../../assets/images/png/icon-quest.png';
import iconcontact from '../../../assets/images/png/icon-contact.png';
import iconconfig from '../../../assets/images/png/icon-config.png';
import iconInteract from '../../../assets/images/png/icon-interact.png';
import { useDispatch, useSelector } from 'react-redux';
import { GwerhStates } from '../../../functions/GwerhStates';
import { preloader, preloaderState } from '../../../middleware/redux/actions';
import { ServerConnection } from '../../../functions/ServerConnection';
import Preloader from '../../components/Utils/Preloader/Preloader.component';
import { 
    handlerInteractOnClick, 
    handlerInteractOnMouseEnter, 
    handlerInteractOnMouseLeave, 
    handlerTaleOnClick, 
    handlerTaleOnMouseEnter, 
    handlerTaleOnMouseLeave 
} from '../../../handlers/handlers';

const GwerhTheBard = () => {    
    const [urlTale, setUrlTale] = useState('')
    const [name, setName] = useState('')
    const _preloader_ = useSelector(state=>state.preloader)
    const dispatch = useDispatch()

    if(urlTale !== ''){
        document.querySelector('.gwerh_player').style.display="block"
        document.querySelector('.icon').style.bottom="90px"
    }
    const talesList = useSelector(state => state.tales)
    

    GwerhStates()
    ServerConnection('gwerh_body')

    return (
        <div className='gwerh_body'>
        { 
        (_preloader_ && talesList.length>0) ?
        ( <><Preloader img={logo} /></>)
        :
            ( null )
        }
            <Link to='/'> <button className={s.out} 
            onClick={() => { return (
                dispatch(preloaderState(10)),
                dispatch(preloader(true)),
                document.querySelector('.icon').style.bottom="10px"
                )
            }}> Volver al inicio</button></Link>
            <div>
                <div className='gwerh-cont-title'><p className='gwerh-title'>Gwerh, the bard</p></div>
                <>
                <div className='gwerh_cont_tales'><ul className='lista'>
                    {   
                        talesList? 
                        (talesList.map (e =>{
                            return(
                                <li key={e.id}>
                                <button className={s.list} value={e.attributes.url} name={e.attributes.name}
                                onClick={(e) => handlerTaleOnClick(setUrlTale, e.target.value)}
                                onMouseEnter={(e)=> handlerTaleOnMouseEnter(setName, e.target.name)}
                                onMouseLeave={()=> handlerTaleOnMouseLeave()}>
                                {e.attributes.name} </button>
                                </li>
                        )})) : null
                    }
                    </ul></div>
                <div className='gwerh_cont_interact'>
                    <div className='gwerh_btn_interact'
                        onClick={()=> handlerInteractOnClick('Interactuar')}
                        onMouseEnter={()=> handlerInteractOnMouseEnter(setName,'Interactuar')} 
                        onMouseLeave={()=> handlerInteractOnMouseLeave('Interactuar')}>
                        <img src={iconInteract} width="60" alt='Tales' />
                    </div>
                
                    <div className='gwerh_btn_interact_on'
                        onClick={()=> handlerInteractOnClick('Gwerh')}
                        onMouseEnter={()=> handlerInteractOnMouseEnter(setName,'Gwerh')} 
                        onMouseLeave={()=> handlerInteractOnMouseLeave('Gwerh')}>
                        <img src={iconwhoru} width="60" alt='Tales' />
                    </div>
                </div>
                    <div className='_tales_' ><p>{name}</p></div>
                        <div className='gwerh_btn'>
                            <div className='gwerh-menu-btn'>
                                <button className='gwerh_btn_tales' 
                                onClick={()=> handlerInteractOnClick('Tales')}
                                onMouseEnter={()=> handlerInteractOnMouseEnter(setName,'Tales')} 
                                onMouseLeave={()=> handlerInteractOnMouseLeave('Tales')}>
                                <img src={icontales} width="61" alt='Tales' />
                                </button>
                                <button className='gwerh_btn_quest' 
                                onClick={()=> handlerInteractOnClick('Quest')}
                                onMouseEnter={()=> handlerInteractOnMouseEnter(setName,'Quest')} 
                                onMouseLeave={()=> handlerInteractOnMouseLeave('Quest')}>
                                <img src={iconquest} width="60" alt='Quest' />
                                </button>
                                <button className='gwerh_btn_whoru' 
                                onClick={()=> handlerInteractOnClick('Who are you?')}
                                onMouseEnter={()=> handlerInteractOnMouseEnter(setName,'Who are you?')} 
                                onMouseLeave={()=> handlerInteractOnMouseLeave('Who are you?')}>
                                <img src={iconwhoru} width="60" alt='Who are you' />
                                </button>
                                <button className='gwerh_btn_contact' 
                                onClick={()=> handlerInteractOnClick('Contact')}
                                onMouseEnter={()=> handlerInteractOnMouseEnter(setName,'Contact')}
                                onMouseLeave={()=> handlerInteractOnMouseLeave('Contact')}>
                                    <img src={iconcontact} width="50" alt='Contact' />
                                </button>
                                <button className='gwerh_btn_opciones' 
                                onClick={()=> handlerInteractOnClick('Options')}
                                onMouseEnter={()=> handlerInteractOnMouseEnter(setName,'Options')}
                                onMouseLeave={()=> handlerInteractOnMouseLeave('Options')}>
                                    <img src={iconconfig} width="50" alt='Configuraciones' />
                                </button>
                            </div>
                        </div>
                    <div className='gwerh_player'>
                        <AudioPlayer 
                            src={`${urlTale}`}
                            onPlay={e => console.log("onPlay")}
                            onPause={e => console.log("onPause")}
                            onEnded={e => setUrlTale('')}
                            >
                        </AudioPlayer>

                    </div>
                </>
            </div>
            
        </div>
    )
}
export default GwerhTheBard