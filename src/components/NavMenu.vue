<template>
    <header class="nav-menu">
        <nav class="nav-menu__list">
            <h2 class="nav-menu__main-title">
                MyTrack
            </h2>
            <a href="#" class="nav-menu__link --active">
                <svg viewBox="0 0 20 20" class="nav-menu__link-icon" height="20">
                    <use xlink:href="#app-icon-dashboard"></use>
                </svg>
                <span class="nav-menu__link-text">Dashboard</span>
                <span class="nav-menu__link-counter">{{ toDoDone }}/{{ toDoLength }}</span>
            </a>
            <a href="#" class="nav-menu__link">
                <svg viewBox="0 0 20 20" class="nav-menu__link-icon" height="20">
                    <use xlink:href="#app-icon-calendar"></use>
                </svg>
                <span class="nav-menu__link-text">Calendar</span>
            </a>
            <a href="#" class="nav-menu__link">
                <svg viewBox="0 0 20 20" class="nav-menu__link-icon" height="20">
                    <use xlink:href="#app-icon-team"></use>
                </svg>
                <span class="nav-menu__link-text">Teams</span>
            </a>
            <a href="#" class="nav-menu__link">
                <svg viewBox="0 0 20 20" class="nav-menu__link-icon" height="20">
                    <use xlink:href="#app-icon-chart"></use>
                </svg>
                <span class="nav-menu__link-text">Charts</span>
            </a>
            <a href="#" class="nav-menu__link">
                <svg viewBox="0 0 20 20" class="nav-menu__link-icon" height="20">
                    <use xlink:href="#app-icon-settings"></use>
                </svg>
                <span class="nav-menu__link-text">Settings</span>
            </a>
        </nav>
    </header>
</template>

<script>
export default {
    computed: {
        toDoList(){
            return this.$store.getters.todos;
        },
        toDoDone(){
            return this.toDoList.filter(item => item.isCompleted).length;
        },
        toDoLength(){
            return this.toDoList.length;
        }
    }
}
</script>

<style lang="scss">
    .nav-menu {
        position: fixed;
        top: auto;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color: $blue-1;
        z-index: 1050;

        &__main-title {
            display: none;
        }
        &__list {
            height: 100%;
            display: flex;
            align-items: center;
            padding-left: 5px;
            padding-right: 5px;
        }
        &__link {
            font-size: 8px;
            color: $blue-light-3;
            text-decoration: none !important;
            padding-left: 5px;
            padding-right: 5px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            transition: all 0.15s linear;
            flex: 1;

            &-icon {
                fill: $blue-light-3;
                flex-shrink: 0;
                margin-bottom: 5px;
            }
            &-text {
                flex: 1;
            }
            &-counter {
                display: none;
            }
            &:hover,
            &.--active {
                color: #fff;

                .nav-menu__link-icon {
                    fill: #fff;
                }
            }
        }

    }
    @media (min-width: 992px) {
        .nav-menu {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            width: 330px;
            height: 100vh;
            padding: 40px;

            &__main-title {
                display: block;
                width: 100%;
                font-size: 24px;
                color: #fff;
                line-height: 1;
                margin-top: 0;
                margin-bottom: 100px;
            }
            &__list {
                flex-direction: column;
                padding-left: 0;
                padding-right: 0;
                align-items: flex-start;
            }
            &__link {
                font-size: 16px;
                flex-direction: row;
                margin-bottom: 10px;
                padding-left: 20px;
                padding-right: 20px;
                height: 50px;
                border-radius: 12px;
                flex: 0 0 auto;
                width: 100%;

                &:last-child {
                    margin-top: auto;
                    margin-bottom: 0;
                }
                &-icon {
                    margin-right: 10px;
                    margin-bottom: 0;
                }
                &-counter {
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                    line-height: 1;
                    margin-left: 10px;
                    font-size: 12px;
                    height: 20px;
                    background-color: #fff;
                    border-radius: 1000px;
                    color: $blue-3;
                    padding: 0 7px;
                }
                &:hover,
                &.--active {
                    background-color: $blue-3;
                }
            }
        }
    }
</style>