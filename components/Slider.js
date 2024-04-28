import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from '../styles/Slider.module.css';


const SimpleCarousel = forwardRef(
    (
        {
            children,
            isHorizontal,
            gap,
            minHeight,
            minWidth,
            onActiveIndexUpdate,
            autoPlay = false,
            hideArrows = true,
            hideDevPanel = true,
            hideInitGap = true,
            autoPlayInterval = 3000
        },
        ref,
    ) => {
        const [selectedIndex, setSelectedIndex] = useState(0);
        const [isHorizontalState, setIsHorizontal] = useState(isHorizontal);
        const containerRef = useRef(null);
        const itemRef = useRef(null);
        const [left, setLeft] = useState(0);
        const [n, setN] = useState(0); //no of cards displayed in one time
        const [dim, setDim] = useState(0);
        const [touchPosition, setTouchPosition] = useState(null);

        useImperativeHandle(ref, () => ({
            handleNextEvent() {
                setSelectedIndex((s) => s + 1);
            },
            handlePrevEvent() {
                setSelectedIndex((s) => s - 1);
            },
            handleReset() {
                setSelectedIndex(0);
            },
        }));

        const resizeWindow = () => {
            recalculate();
        };

        useEffect(() => {
            resizeWindow();
            window.addEventListener('resize', resizeWindow);
            return () => window.removeEventListener('resize', resizeWindow);
        }, []);

        useEffect(() => {
            let interval;
            if (autoPlay) {
                interval = setInterval(() => {
                    setSelectedIndex((s) => s + 1);
                }, autoPlayInterval);
            } else {
                clearInterval(interval);
            }
            return () => {
                clearInterval(interval);
            };
        }, [autoPlay]);

        useEffect(() => {
            setIsHorizontal(isHorizontal);
        }, [isHorizontal]);

        useEffect(() => {
            const x = (100 * gap) / dim;
            if (children && selectedIndex >= children.length - n && selectedIndex < children.length) {
                setLeft((children.length - n) * (100 + x));
            } else if (children && selectedIndex === children.length) {
                setSelectedIndex(0);
            } else if (selectedIndex === -1) {
                setSelectedIndex(children.length - 1);
            } else {
                setLeft(selectedIndex * (100 + x));
            }
            onActiveIndexUpdate && onActiveIndexUpdate(selectedIndex);
        }, [selectedIndex, n]);

        useEffect(() => {
            if (containerRef.current) {
                if (isHorizontal) {
                    const width = containerRef.current.offsetWidth;
                    setN(Math.floor(width / (dim + gap)));
                } else {
                    const height = containerRef.current.offsetHeight;
                    setN(Math.floor(height / (dim + gap)));
                }
            }
        }, [dim]);

        const recalculate = () => {
            if (itemRef.current) {
                if (isHorizontal) {
                    const itemWidth = itemRef.current.offsetWidth;
                    setDim(itemWidth);
                } else {
                    const itemHeight = itemRef.current.offsetHeight;
                    setDim(itemHeight);
                }
            }
        };

        const handleNext = () => {
            setSelectedIndex((s) => s + 1);
        };

        const handlePrev = () => {
            setSelectedIndex((s) => s - 1);
        };

        const handleRadioChange = (event) => {
            if (event.target.value === 'vertical') {
                setIsHorizontal(false);
            } else {
                setIsHorizontal(true);
            }
        };

        const handleTouchStart = (e) => {
            const touchDown = e.touches[0].clientX;
            setTouchPosition(touchDown);
        };

        const handleTouchMove = (e) => {
            const touchDown = touchPosition;
            if (touchDown === null) {
                return;
            }

            const currentTouch = e.touches[0].clientX;
            const diff = touchDown - currentTouch;

            if (diff > 2) {
                handleNext();
            }

            if (diff < -2) {
                handlePrev();
            }

            setTouchPosition(null);
        };

        return (
            <>
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    {isHorizontalState && (
                        <div className={styles.carousel_container_x} ref={containerRef} style={{ minHeight: minHeight, gap: gap }}>
                            {!hideInitGap && <div style={{ width: gap }} />}
                            {children.map((Item, key) => (
                                <div
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    style={{
                                        transform: `translate(-${left}%)`,
                                        borderRadius: 10,
                                    }}
                                    ref={itemRef}
                                    key={key}
                                >
                                    {Item}
                                </div>
                            ))}
                        </div>
                    )}
                    {!isHorizontalState && (
                        <div className={styles.carousel_container_y} ref={containerRef} style={{ minWidth: minWidth, gap: gap }}>
                            {!hideInitGap && <div style={{ height: gap }} />}
                            {children && children.map((Item, key) => (
                                <div
                                    style={{
                                        transform: `translateY(-${left}%)`,
                                    }}
                                    ref={itemRef}
                                    key={key}
                                >
                                    {Item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {!(hideArrows && hideDevPanel) && (
                    <div className={styles.carousel_options}>
                        {!hideArrows && (
                            <div>
                                <button className='previous-button' onClick={handlePrev}>
                                    Previous
                                </button>
                                <button className='next-button' onClick={handleNext}>
                                    Next
                                </button>
                            </div>
                        )}
                        {!hideDevPanel && (
                            <div>
                                Orientation:
                                <div onChange={handleRadioChange}>
                                    <input type='radio' name='orientation' value='horizontal' defaultChecked />
                                    horizontal
                                    <input type='radio' name='orientation' value='vertical' />
                                    vertical
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </>
        );
    },
);

export default SimpleCarousel;
