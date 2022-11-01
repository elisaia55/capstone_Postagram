import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { OpenModal } from "../../context/OpenModal";
import { deletePost, editPost } from "../../store/post";
import Picker from "emoji-picker-react"


const PostMenu = ({ post }) => {
    const history = useHistory();
    const dispatch = useDispatch();


    const { setPostId } = OpenModal();
    const [open, setOpen] = useState(0);
    const emoji = useRef(null)
    const user = useSelector((state) => state.session.user)

    const [input, setInput] = useState(post.post.description);

    const onEmojiClick = (event, emojiObject) => {
        setInput((older) =>
            older === null ? emojiObject.emoji : older + emojiObject.emoji
        );
    };

    const HideOutside = (ref) => {
        useEffect(() => {
            const handleClick = (e) => {
                if (
                    !e?.target?.classList?.contains("emoji-btn") &&
                    !e?.target?.nextElementSibling?.classList.contains("hidden")
                ) {
                    setOpen(0);
                }
                if (ref.current && !ref.current.contains(e.target)) {
                    emoji.current.classList.add("hidden");
                }
            };

            document.addEventListener("mousedown", handleClick);

            return () => {
                document.removeEventListener("mousedown", handleClick);
            };
        }, [ref]);
    };

    HideOutside(emoji)


    const gone = () => {
        document.querySelector(".hide-options").classList.add("hidden");
        document.querySelector(".delete-conf").classList.remove("hidden");
    }

    const deleted = () => {
        dispatch(deletePost(post.post.id));
        setPostId(0);
        history.push(`/`);
    };

    const edit = () => {
        document.querySelector(".hide-options").classList.add("hidden");
        document.querySelector(".edit-it").classList.remove("hidden");
    };

    const show = () => {
        if (open === 0) {
            emoji.current.classList.remove("hidden");
            setOpen(1);
        } else {
            setOpen(0);
        }
    };


    const handleEditSubmit = () => {
        const obj = {
            description: input,
        };

        dispatch(editPost(obj, post.post.id));
        setPostId(0);
    };

    return (
        <div className="options-modal">
            <div className="hide-options">
                <div onClick={ gone } className="delete-post">
                    Delete post
                </div>
                <div className="edit-post" onClick={ edit }>
                    Edit caption
                </div>
                <div className="goto-post" onClick={ () => setPostId(0) }>
                    Cancel
                </div>
            </div>
            <div className="delete-conf hidden">
                <div className="del-conf-top">
                    <p className="del-title">Delete Post?</p>
                    <p className="del-desc">Are you sure you want to delete this post?</p>
                </div>
                <div className="delete-post" onClick={ deleted }>
                    <span className="dlt-post-btn">Delete</span>
                </div>
                <div className="goto-post" onClick={ () => setPostId(0) }>
                    Cancel
                </div>
            </div>
            <div className="edit-it hidden">
                <div className="edit-it-top">
                    <div className="emoji-post-3">
                        <img
                            onClick={ show }
                            className="emoji-btn editb"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8AAADz8/P09PT+/v79/f319fX8/Pz29vb39/f7+/v6+vr4+Pj5+fkEBATr6+vk5OTc3NxISEhoaGigoKDn5+fR0dFjY2OVlZV2dnaoqKjFxcW5ublwcHArKyuvr68TExMaGhovLy9BQUFSUlLMzMwVFRVPT0+RkZE4ODh9fX1dXV2IiIgtLS0hISGamprqr2kJAAAXz0lEQVR4nN1dB3vrqBJFsrpkS3JviZ3i9Jf8/3/3JAGiF7Xsvdff7sbJDmKOGGCYOQAA8ON5wheg+jK97LiPaz5hAn/1wrD9Av+Pn7RffJWsICKTBQpZLNJFtoua8JNm8M/efA7/7M9TJJcl8EuShT1k50ZZ/DiARVrZEMv2qxo/t/lkEfyzF0fwz34Uw0ck0RzVH6WCLKolygAvm2BZpBF+XIhlU/I4JCtULZMVqhbVTDjZ5qnZDP7ZC2awlnAWwJKpG6MCLnpENEMlZzOkiBuhh2PZ2EUaBUjWx7IJkc1Y2bZqH1edSKruoWZjsynCXSltLunysm4AWFkC0O0CUCWbYVmx6hlftahmY7whslzyGt1RAXpE6UAJUPkyRIABqVqtJqo6yjzcjrUirgAw4koGBCA20VbpHi0YEYBc1YlQNXm3RBYoAJJ32zwOzRp0q3RvwV4AJSYqAlSaqFnNtmqupIVx/yV9EMuiWswmOnIflJioRR8U1VT2QRagWuk/qw/aqMm9W1TLkGliUB/UzJlaE7VW069/ePE086Bn0wc7TBNWADkT9VO/dvKiSfrgUBMVAPbog2HczPhz4/g7ch/UuWo279akZlt1GNT/x0PrkH9wmgihCJrx/xJXrZOJ4qpxSdWr+SOmiS6uGq8m/u0fcdUo2YgG+B/0QbcHwD5qekwt/46r1qrZzPh+9FvTxK+5aq2JJmm9QJzH/8qKXlQzrisK0+5t/3uuWpcVvTgWBnWNHo6+6eyEM9HpXDXNNKHuSappoq1a+WqmctVGnSZEV00I/pkB/qV9kAM48TRByf7SNMED7GLcv90He00TrZoerOWfc9VaNcP6f4TR77tqI/VBo4mm9VToZ/NpAWITBTF29gPscYy8ohcMLWtm/CThSo69og+a+v0oL/K8KLdlWRa5G9d/jHu8W6EPaqaJOKgfh2f8qVrQ8/Py9POxe7p36M/90+pjfy5dWPWo04TYDsMBqqeJ8nL39M1AcxYL6peHp8O5xJHbcVw1UU225FgmWj3FvawkuPCXBYV0dXGBvA9ySveazfhXMwbAJE2L/ZO04QSA6OfTvkSFeyVfNHlaJcABfRCU+6UUhhRg25TL9QYM7YOimh7EPWofPD07AgwjQPjz8waSYAxXrVWzyY62af4x+uD8eHV6AURfXtaZQukurlqrZsPV8LMUv5rBrpq7rxRV9DQrgNWP697tmkJRAowbygmm2gzvg1mDbxDA5ud1HyWRqgU7BR4ai/f8sQCuNUrTXyRWzMs66+4A1YaGfxvUB+fgdG9QGv768nDVIMV/qXyekxSgxYpeAXBgC3qbnbZVHneHt/O2LDb5piiqf8vt+e2w+5+2tVc5GGVV1x8gmSaixkDlk1yl6XrrZinm1QXIBfXntVbbNXF7RHNGpjos+CcA7G6i4bwQ5nf85fVYNDLq/KAfFsdXKcDqxzJnZPsEHjheW59pwk8vgmXCEXF1zhEK04p+dtpRsyj9lLPeozT2QS+FvLbubU/YOO6dtOu9Xlwv81hZ9YIX+MVlKQHoOIc4GuJwsby2Pn0QlO8ygIeyLtQhqjarH3XniO6C815g2R7tELC8th59EJwdHmD1z5sL6LChffIl/xIeV/08Sau2MFF/1vBQJbw246tpAa55japPg68fTybw3TdJlz4O9Cg7AyQm+iECPDT4+iVfmgHJPYid8SuZDRkqepf0dgLAZYmUHpJ8KZfCc3etmj16Uu+S/qugyBE9bljgN/IuQmd8Zqq26oODWzATAO4KAWDfwG++40fn57CfmhyvrUMfFFvwiLhV4yRfjtTE0fx4BlEfNRGvrbuJejzA9zJRKd0r+QLKRwZgBRG9nS4minltPXovP8jcufHIyRc/vWMALpxVZ4AJy2vrMv7y08QxDCZIvqw5f/yro5oJw2sbNNGfwawHndKcAMUeE0Z67Be+ZQH2cNWuWzCQTsm9W7K0unGL49O8g4nKAdq0YMkBLL3JcvSgvDKd0SmmA0jGX5ddTSw2/pQ8mWLBjDbvnqWabdUeVLrDij5l14PXTTgtnbK4OvRoc7BTs606hLy2DsY9Z1f019IXTXRUngzYsuGNc8ccUb1AnON9fhYlo4IdRbfT9UEsm2zZ0WYT2AOEvLYkNQGkjBuwQacTILLT8WTOzGizBGY1pbw2q7b32LDhGvTqg53plNTUX/08GtVsex16nD3A+YYBeBfOsGwfE+3Ak1kx8ZvcFqCUuKcvyUS2392Brpp1ftBzHymAtYM6FcATDdApYwsTVQHslgCdF2z3DycCCJjkyzGZxlWTJ1+OdNX3eMe2DdsF/rlH+mw3b72TX6FT7uiI5doaIMtrM4y/GQ3QKVAX+S1Kc84s+lO1mgxAltdm6r17adDp13a+HFvXptJhr1aTBpg15DLMazPm6Bd02BADnHiTMrWiZ5yNq2tHqatFcJbbOP7u6cAvjov+JqW5pIfTvW/D+kSNJwfIG/d8QWX2Dgjg71KaD1Q3ubpcukW9QUcBUHg1Rzp1iUP3U7pqYtDJpdOnR7ma/QGCKzWUvUHZiTcpi5GVL0qHBwPAWA9QXCqfqIcv6iac3FUTWxt5Nqglb3YAPfhnc7DjmXr4G+jqqnXqg+rwLXgjAJ1Pq80BiNdmXioz0SfX4KpNs/OlbhWXAKyWwpGxBb0M8trMTl66pwAefnOa4FZ1d9RS+CcxAmxOb2l5bTofaE7PtqXuZWT8ZNRlkzKIAkPypaQii8jr0O2lZnhtWkozvXh51efoK1xReStzF6D3ZbnzxatKbXNjChtnT+uBr+DUVG3QMQPMwJ5yJy5A46rNwGYP46nvbyzjV9+CmzdUar/RJl8S4p1WZioFKGzQsQEIngjAqxurTTRAHRaKVu6xVR/0wBs1guz9SEOnzBekgmUPgIodoC7lEK48tYlGLhuKW+bikRsSgPGSHiIR10u1Lt9Rsq4/jokCcKEcwnOmBDhD4RTiod/D6rR90A/vGYAL5zGFVUuXrWdK9pKpAeIQD+K1Gdz0FbW+zj2FbOaivCmdgG+ymobNWTsW4AJSL1TBP8o5reyJAyhukuN5bQo3nXroK1AC9E8CwIbQZHDVTgLAupQ6dPTa5jEcRwkQGyXktc2xd6JyEUoSQMAuvXQ18STRdWlc0T+JhZwnoATYpmfb+UKzj5PhtWmcvItD6i+grMxVY1aordKl4TyDUgLQcbaYbC+4zFFJyZ7lLdh6lDSvTRePu6OeKZdtPJm1DKCzT1QtCF21HwnARTPVSQFWXZrqCwervdTwz+qlcuw/kfrrkUO1or+TAUThALWrdpAAXDh3coCNmtTItLQ5csPUglGQf5P615oV/U4CcIEoaeoV/c4RAaJSinX5mrzJ73xm3EttAhi7fknVv9U42ztHBIh0Va8mwKcjAdiUUgUebtSEu+UChWLwr/mvwpPBJenh3AXq1cSdIwHYWKlmwZvcyQDWVqqMrLjU0H7iAbocQMhrU68km7b/IfU/ZuoFb7h3JADrMUO3oicrTxpg1RvUoaPonjx/TdQEMhMNmdNbVF7sB6l/l6qjangY5waOUr+iB6UMoFOmaq5E9klkP1iA/FI0YXhtSjd9RZQ+hLoVvXzGN51nsJQAfNKlz7wDkV0B3TTB8tqUS+VqsmiHfhhGVIUsTiLAOtNviKqdRICVe6+LT1Or1aVH90EhdAR5bZzSwgTTmn0F9MwDZFtlJQBciQAFpVfCFoSdp42NnYnsfSYCFGYzBcC2p+cOUXqracG68JPDAnyKZ8bkC0+yqkq5+tjYlsgu8kBw1fjDpA0AvZgOw5ZagF68eWYAPuc2R25k7isD8HVjCB2VVGcoQgxQFVlBv6mPHQtySunCkHwBAEUxmv/+yM4UkUa28URTf/aRKfhXUBNijqtWmagHa9HEApCVwpe2MSdfXByJ2lfegXXyxW0jUXliDN9iq6qVyg0AeV6bcCJQ1fYFAbjIfXULtuf2JmW5LZuQmYWJEv7ZpinlBRYBeGpkKoDcROP2uYDw2hRLZWoB97IJjACHnSdjw5MJiisZmUqZq0ZkGV6bah2yJf36ocD58ZF4Mr2O3EjzFzIybbU5Iub0FuVSmQqkXwsTwOHJFyPADORXMvSWwILOowQIaynJwLXITQDHOU/GEN3cUHNLEWtyRAaAOPJDx0U2coCDTojtfuxNQU2eBT5GwxagJFxFc2YLIG2Vcc+TMdJICnrGB+y77Wyi/izKCcB65Jrq2LEObEM6xZYjWeW9Hx7USHPsGM67oiDGVEf/daFT3qiRweUA8i2YQF6bNpoT3xOzP/sTHf3XBWCC47eVUvcZ0JroHPLaUh3AZn2IreJtPtGxYx0ARukbGfqWnhZgLOW1CUtleo0PVAB/ZZqAsmhfWaPUipEVqpby2kSezAcx+x2n9MjHjhnSmFA2oUPCHza8XfybMqJKxdD+N2cADjwhto+JVrLze+Ipr4GZccbWInHT4zM1IbLnqv2mq0ZkXQLQOWX9AZItCCUBWIcx/sNpAsre6BwVHwk1AJTvfHEfyIS4nnyaMNMp1wTgN0r5awIPMMttCFc9kQlx5Zs3Kfc6dsyyD9YfksshpCFl4AHdSmbY+XKgUiHhf+WqEVkMz0Ehb3qa4FsQnd7Smp2iljOVuiw4pSdf0QsAyxYgit9qWhDx2tptBaqlMv3Mo1x2uhW9QKck26zhykIXGwuoLLeOTum3z1w0XAxNqySzMVw1TxP885YEoGMAiGNjCKB6qQxW1Hwx05hosb3lilrsW9Att6XHAaTYhi4F8K4LQC2d8kIAOiegctXKOuB9/fLBkGki/KqDMM+lAqCLtspDXS5dAGpZ9zSvbeeTkAWj9AnZ8mM+wFXLH52WaSQPPNAMqlnY3UQVGV5qAYXjbXwLEjbW4hb27YM3on0gWZdXSucUwKVnnqHgjK8LV8Fa9tR8cYFK833whwotrNlarKeJNdHe+ZlLIysXSmSfGlsQ8trIrWRKEgI9XyyhLD9NLGmewuesRx90Pynt2w3N3KJnSYmUc05NESBzK5lu50tED9Gl9DyZ/1HTlFPzsbJOJgrYHdsL51EKkE6sLVuASicKZrkR413Lum+PfnSaMVrCNgw/GYDVcHgD9gBjsH1mAOLFNr/ouRP6gjb411St5LUxJTd0/XkgejLt6VW4Kas3sQF2JhqD4s5hASKHjA88UNsscSBR04J4qIAATTtfPintv3yZq/bIAIStXYAM7+hR0ymT8s4RAL7DqrlFD73xaWcA2M5mqAVNS+UbZR5w6xrvi1ZTGc9TqGz1HBkABudnRwT4SO+5bz1KilKwcG6GFuQAGne+gBfydEg6EZxt99XhAVY/vw+3qqqIXyHAVpndDt+U0u2XZxdIAg+APlbxwQAQm6hnCZB16etGFFcTWXTgAcIvD59rNOykAdK19gm2x8+H1izoQQYu+wQaCSCciQXciKxtQTS+QF6bxQbJILtSihzkrHvujA7Krqu2XP0cz7cyz/NiezruV9/Sl9H8PMOq+cBDQp+Mc02sTFTBa5OPv3takVJBI6kP3BWVppEyHxFgNc0VbAtihytuT3GpZX+sWjCBt5LxvDbFBONe6dnWU7X2m2h24hcVQKi6FOAs4fZyW/TBFJ3eYgSI7GRPm9KFB4iZO0khPy7XDiBsQFl82j/ST/mxmSZa350HqCoZkdZB860i+XL+7gnw+4yrFgBmOfOUpMt9DqYWbEvi4RTWstO8jGT9QL8MS4APa6SaLADPHhxzBB3SmCaAAeXk3dO1XIAy6OSn7vraEeDLGgVApJRmeGYEfspjGw7q0YLaHP2J1tXBN+AoVvRn6hoWI8Cnc0JSk2J8GhOz2myFRR9EAFlemzFHT2/xqt4kAqhKvmw/Hs0A6yb5Kqua1DtfAjB/pJ+yUgIUW5C/lcxk3PQRKmjbh6aWCKTbr3eMQwrQcd6/6h0F2ivaQBPsow6OSQxqEoApw2uzOMuCO/VybRFV8/PjXXukPPd5ORzhZj9ZVI0KPDD7jdoLBSxakOW1qfsgVZI7r+3sm5Mv9QtMbpevz/f7BxSqerh//3w73zKcfzbcInhmAJLwhjlzx91KZsWTyZl+5SCP2ib5UsGZ19dbFCXm/82UxGQm+LdlaoS8LEuuBKraBJA17jM9cDiL0vQahQUvZrPqNinTdMqaTUoBbJ0C+zytCqAq+UI2mzU+fjF+8oUx0WLBvNKDAqAmR8T+ZmPc78yAuCjAuAlQlgdYOAzAJ2s1jS2obnty/CX8ed0m4/BkZFSC8soARNGnLibK8toseTLs3mRnsVW8xm48GVkf3LItiLaqWfEfaF5bIt4CYqBTHrnJ+wym6IOAnSYW+Ag1C1dNyWuzztF/cQv5NZ3UHGaixFUTNha/KdVUAUS8NjyKdzDuZMcArM9kn3OyA/tg5YuuOICrzmpG8lvJbHL0M3SqEumMj4UBoMWxY+xq4pED+CkHqDHR9tgbxasx8GSeHa4zHsF4fTBj14P1859t1Yz5wIMaoJ4nEz7zS4Vdrj4JoZuJ+jl/yZnz7HdtB56ZKBq3iUbSHv9FkKLjInsCxLJxwgSddCZqQefhAXbgyUTZigW4wPfMDDJRkGz5S84c1SBjo2Yjqb6VTL9JGeYR2FDMwbU5/k09TeBEGwOw+zTRjm+I19abTnnkAVafL0Rl6NUHJXdaKSd6GzXZW8n67HzBFBMmdI/utDJPE/yKvsVn6apZ9CQPULeS9dn5Mi/e+VGh/nJXgiTo2gdxopR9X08qZ9tGTdWtZBZ0SrJcanbHi3HR5RHvZrEw0UrXvLk7T8zlqNaDXQ6T5kp2pzSfZTH86p/d2a0dJyOdMvHcM3NW1LAVvdCT0GscQqfcCNeI4Z+va3gcr3SrMZqQy/WSLUQFnVQxGQtXjQM47IRYFHOXBH7rz259cyN02WPVO3HDpTXa23rXyokAO4QN1Rt0YMnAxpPR0inzlTayff952Nd3yRZlkdfxtvJ2efvYtYc1SAGu8KwzaHMAdyvZkBNiT/e8rmxToj9dX5jwsCDbJl9O+NBRC4CxUk18K1mXPqiiU4bRWqG0BKmytdv0WdIh+aLpSfytZIN2viQg3V91AC1SbSiF/ZOADukzzSY59layMXa+uHvFrbcdAF5/atfWnKO3UbMRwby2cXa++O7xoXcL1p+HY2KdYbBVU6F0z91n1cNvn0ThjgB3N1OrGFf04mxmfjXdd75sfpY9AC7XRrZhnzsH4G8j73yplmNFC9IO4HJPGL+9+qBKTcRrm2STsntZmQE2n7vLzEuNAHsNFc2ML57bO84mZb9y1YrzYfktNmX7+V5+nAv6uV36oIWaCcNrm2qTcr49rT9Wy3sa3eJ+ufpYn7bt/kFz1Z2mCVQ1vJWsoe8pSo6ySRlGgbwsr3zSoqy90yJ3G1ccE4gtCFmaUVSzh4y5lWzyTcox5pbGuIt0uBaj55EbNK/tdzYpAzb5Yg2w8/VQjJqKkpNsUgZAuwNpnD5o2YLTbFLudjWNRWzMYh+nouREm5RHuppGcNU0JurBWsZw1XqaqJlxZk6+yADiU1Xrh1ifjAcG90F35D5oNFH2VrLJNyn3MdFhgQf2VrKppgmRJzPWNGH2KOHpLSFXchxXzeIg8cmniVZNvuSo04TuhFibFuzuUYrtwJac4DwZFuBkN5hZAtSNvyO7aj2cqF5DReda/gxXTW2ifB9EHORfc9XsL/ga6cgNltf2Z7tqvQIP7K1kf5mrJlOTN9G4ufaH8Nr+ZFfNZkUvqsnx2v4oV40D2D8+3X7+mhV99+CfqZa/1lXjAU7sqtms6G0Gme49SSj5B7pqFskXtZpKXtvk08SoyReJmqhqj7+V7F9x1Vo1WV7bOAB/YUVvPxbKbyWbYueLJcCRpwlfyWsbAPAXpwmlq6YgDY0NsI+r1iv5YlYTlsQEuzDAYbgA7yzFPC2cWfGCSJDF0bogwY9DJoplEyw7x7KxRBYg2QzL8lVHYtWimlzVsGSGeGd+jOpPYlQgjdHKY45u59TKhlgE1YJlQyKLH0dkuceFYtWxddUg49WEvyX4rKgUPdNPUYEQf0lSVDLlZUMii0QSlJHUyLaPw1V7FlX3UtMn/6W+eOiYJPoLJ9JFVibidXhcF1lBTe//WspLJDinzxoAAAAASUVORK5CYII="
                        />
                        <div className="picker hidden" ref={ emoji }>
                            <Picker
                                native={ true }
                                onEmojiClick={ onEmojiClick }
                                pickerStyle={ {
                                    position: "absolute",
                                    width: "20vw",
                                    marginLeft: "-20px",
                                    top: "110px",
                                } }
                            />
                        </div>
                    </div>
                    <textarea
                        value={ input }
                        onChange={ (e) => setInput(e.target.value) }
                        className="edit-it-input"
                    />
                </div>
                <div className="submit-edit" onClick={ handleEditSubmit }>
                    <span className="menu-btns2">Submit</span>
                </div>
                <div className="goto-post" onClick={ () => setPostId(0) }>
                    Cancel
                </div>
            </div>
        </div>
    )

}

export default PostMenu;
