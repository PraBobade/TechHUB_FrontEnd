import React, { useContext } from 'react'
import Layout from '../../Layout/Layout'
import UserMenu from '../Menu/UserMenu'
import ViewContext from '../../../Context/ViewContext'

export default function Downloads() {
    const { View } = useContext(ViewContext);
    return (
        <Layout title={"Downloads - MyTechHub"}>
            <div className="grid-container">
                {!View &&
                    <div className="Mobile-Menu">
                        <div className="Mobile-Menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                            <i className="Mobile-Menu-Icon fa-solid fa-bars" />
                        </div>
                        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex={-1} id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                            <div className="offcanvas-body">
                                <UserMenu />
                            </div>
                        </div>
                    </div>}
                {View &&
                    <div className="Computer-Menu">
                        <UserMenu />
                    </div>
                }
                <div className="content-grid appfont">
                    <div className="Form-Heading">
                        Account Downloads
                    </div>
                    <hr className='FormHR' />
                    <div className="No-Item-Present">
                        You have not made any previous downloadable orders!
                    </div>
                </div>
            </div>
        </Layout>
    )
}
