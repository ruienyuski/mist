export function useDate(){
    const toDate = ((date) => new Date(date * 1000).toISOString().split('T')[0])
    return {
        toDate
    }
}