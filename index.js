const fileInput = document.getElementById('fileInput')
fileInput.addEventListener('change', (e) => {
    const listDiv = document.getElementById('colorBlocks')
    listDiv.innerHTML = ''
    const file = fileInput.files[0]
    if(file){
        const reader = new FileReader()
        reader.onload = () => {
            const dataUrl = reader.result
            const img = document.createElement('img')
            img.src = dataUrl
            img.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = img.width
                canvas.height = img.height
                
                const context = canvas.getContext('2d')
    
                context.drawImage(img, 0, 0)
    
                const data = context.getImageData(0, 0, canvas.width, canvas.height).data

                structuredData = []

                for(let i = 0; i<data.length; i+=4){
                    structuredData.push([data[i], data[i+1], data[i+2]])
                }
                
                const threshold = 50
                const distinctColors = []

                for(let i = 0; i<structuredData.length; i++){
                    let color = structuredData[i]
                    let isDistinct = true
                    for(let j = 0; j<distinctColors.length;j++){
                        let distinctColor = distinctColors[j]
                        let distance = Math.sqrt(
                            Math.pow(color[0] - distinctColor[0], 2) +
                            Math.pow(color[1] - distinctColor[1], 2) +
                            Math.pow(color[2] - distinctColor[2], 2)
                        )
                        if(distance<threshold){
                            isDistinct = false
                        }
                    }
                    if(isDistinct){
                        distinctColors.push(color)
                    }
                }
                for(let i = 0; i<distinctColors.length; i++){
                    let blockDiv = document.createElement('div')
                    blockDiv.className = 'colorBlock'
                    blockDiv.style.backgroundColor = `rgb(${distinctColors[i][0]},${distinctColors[i][1]},${distinctColors[i][2]})`
                    let rgbText = document.createElement('p')
                    rgbText.innerHTML = `${distinctColors[i][0]},${distinctColors[i][1]},${distinctColors[i][2]}`
                    let div = document.createElement('div')
                    div.append(rgbText)
                    div.append(blockDiv)
                    div.className = 'fullBlock'
                    console.log(div.style.backgroundColor)
                    listDiv.appendChild(div)
                }
                console.log(distinctColors)
            }
        }

        reader.readAsDataURL(file)
    }
})