const fileInput = document.getElementById('fileInput')
fileInput.addEventListener('change', (e) => {
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
                    structuredData.push(`rgb(${data[i]}, ${data[i+1]}, ${data[i+2]})`)
                }
                
                const countedData = structuredData.reduce((acc, color) => {
                    if(acc[color]){
                        acc[color]++
                    }
                    else{
                        acc[color] = 1
                    }
                    return acc
                }, {})
                const sortedData = Object.entries(countedData).sort((a, b) => b[1] - a[1])
                const listDiv = document.getElementById('colorBlocks')

                for(let i = 0; i<sortedData.length; i++){
                    let div = document.createElement('div')
                    div.className = 'colorBlock'
                    div.style.backgroundColor = sortedData[i][0]
                    listDiv.appendChild(div)
                }

            }
        }

        reader.readAsDataURL(file)
    }
})