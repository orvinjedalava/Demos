import { createContext, useContext, useState } from 'react';

interface PromptContextType {
    isFilterDialogOpen: boolean;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider = ({ children }: { children: React.ReactNode }) => {

    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false);

    return(
        <PromptContext.Provider value={{ isFilterDialogOpen}}>
            {children}
        </PromptContext.Provider>
    )
}

export const usePromptContext = () => {
    const context = useContext(PromptContext);
    if (!context) {
        throw new Error('usePromptContext must be used within a PromptProvider');
    }
    return context;
}