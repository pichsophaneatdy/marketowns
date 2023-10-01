import {useState} from "react"
import {Box, Slider, SliderMark, SliderTrack, SliderThumb, SliderFilledTrack} from "@chakra-ui/react"
import { NumberScale } from "aws-sdk/clients/quicksight"

interface FilterSilderProps {
    price: number
    setPrice: (val: number) => void
}
function FilterSlider({price, setPrice}: FilterSilderProps) {
        const [sliderValue, setSliderValue] = useState(50)
    
        const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
        }
        return (
        <Box pt={6} pb={2}>
            <Slider max={1000} aria-label='slider-ex-6' onChange={(val) => {setSliderValue(val); setPrice(val)}}>
                <SliderMark value={100} {...labelStyles}>
                    $100
                </SliderMark>
                <SliderMark value={400} {...labelStyles}>
                    $400
                </SliderMark>
                <SliderMark value={700} {...labelStyles}>
                    $700
                </SliderMark>
                <SliderMark
                    value={sliderValue}
                    textAlign='center'
                    bg='blue.500'
                    color='white'
                    mt='-10'
                    ml='-5'
                    w='12'
                >
                    {sliderValue}$
                </SliderMark>
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            </Slider>
        </Box>
    )
}
export default FilterSlider