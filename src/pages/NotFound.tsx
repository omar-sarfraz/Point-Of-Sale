import NotFoundPic from "../assets/404.png";

export default function NotFound() {
    return (
        <div className="w-full flex justify-center">
            <img src={NotFoundPic} className="w-1/2" />
        </div>
    );
}
