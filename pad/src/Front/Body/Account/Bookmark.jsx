import './css/Bookmark.css'

function Bookmark() {
    fetch(`/proxy/member/MyFavorite`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(json => console.log(json));
    return(
        <div className="Bookmark">
            즐겨찾기
        </div>
    )
}

export default Bookmark