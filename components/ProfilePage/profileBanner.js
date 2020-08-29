

export default function ProfileBanner({ name, about, imgurl}) {

    return (


            <div class='profile'>
                <div class='profile-image'>
                    <img src={imgurl} alt='' />
                </div>
                <div class='profile-user-settings'>
                    <h1 class='profile-user-name'>{name}</h1>
                </div>
                <div class='profile-bio'>
                    <p>{about}</p>
                </div>
            </div>

    )
}

