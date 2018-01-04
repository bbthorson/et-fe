<template>
    <md-layout>
        <md-layout md-column md-align="center" md-vertical-align="center">
            <md-card md-theme-default>
               <md-card-media-cover md-solid>
                    <md-card-media md-1-1>
                        <img src="/images/launcher-icon-4x.png" alt="ET">
                    </md-card-media md-1-1>
                    <md-card-area>
                        <md-card-header>
                            <div class="md-title">
                                Login
                            </div>
                        </md-card-header>
                    </md-card-area>
                    <md-card-actions>
                        <md-input-container :class="{ 'md-input-invalid': invalid }">
                            <template v-if="phoneNumber">
                                <label>Enter Code</label>
                                <md-input v-model="code"></md-input>
                                <md-button @click="validateClicked">Validate</md-button>
                            </template>
                            <template v-else>
                                <label>Enter Phone</label>
                                <md-input ref="phoneNumberInput" v-model="phone_number" pattern="^\+\d{11}$" placeholder="+19998675309" required></md-input>
                                <md-button @click="loginClicked">Log In</md-button>
                            </template>
                        </md-input-container>
                    </md-card-actions>
                </md-card-media-cover>
            </md-card>
        </md-layout>
    </md-layout>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { login, validateCode } from '../lib/auth';

    export default {
        data() {
            return {
                invalid: false,
                code: null,
                phone_number: null
            };
        },
        computed: {
            ...mapGetters({
                phoneNumber: 'authPhoneNumber',
                authenticated: 'authenticated'
            })
        },
        watch: {
            authenticated(bool) {
                console.log('Authentication Successful');
                if (bool) {
                    this.$router.push({ name: 'home' });
                }
            }
        },
        methods: {
            loginClicked() {
                if (this.$refs.phoneNumberInput.$el.checkValidity()) {
                    this.invalid = false;
                    login(this.phone_number);
                    return;
                }
                this.invalid = true;
            },
            validateClicked() {
                validateCode(this.code);
            }
        }
    };
</script>
