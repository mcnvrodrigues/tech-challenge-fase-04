declare module 'remoteApp/Button' {
    import type { ComponentType } from 'react';

    const Button: ComponentType;
    export default Button
}

declare module 'remoteApp/HeaderContainer' {
    import type { ComponentType } from 'react';

    const HeaderContainer: ComponentType;
    export default HeaderContainer
}

declare module 'remoteApp/Menu' {
    import type { ComponentType } from 'react';

    const Menu: ComponentType;
    export default Menu
}

declare module 'remoteApp/HomeApp' {
    import type { ComponentType } from 'react';
    import type { HomeAppProps } from '@/types';

    const HomeApp: ComponentType<HomeAppProps>;
    export default HomeApp
}

declare module 'remoteApp/TransactionApp' {
    import type { ComponentType } from 'react';
    import type { TransactionAppProps } from '@/types';

    const TransactionApp: ComponentType<TransactionAppProps>;
    export default TransactionApp
}