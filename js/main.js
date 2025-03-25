// 粒子系統配置
const particlesConfig = {
    particles: {
        number: {
            value: 120,
            density: {
                enable: true,
                value_area: 600
            }
        },
        color: {
            value: '#FFFFFF'
        },
        shape: {
            type: ['circle', 'triangle'],
            stroke: {
                width: 0
            }
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 2,
            random: true,
            anim: {
                enable: true,
                speed: 3,
                size_min: 0.2,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 120,
            color: '#FFFFFF',
            opacity: 0.15,
            width: 0.8,
            triangles: {
                enable: true,
                opacity: 0.08,
                color: '#FFFFFF'
            }
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'bounce',
            bounce: true,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: ['grab', 'bubble']
            },
            onclick: {
                enable: true,
                mode: ['push', 'repulse']
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 180,
                line_linked: {
                    opacity: 0.6,
                    color: '#FFFFFF'
                }
            },
            bubble: {
                distance: 200,
                size: 12,
                duration: 0.4,
                opacity: 0.8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 6
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
};

// 檢查伺服器狀態
async function checkServerStatus() {
    const serverIP = 'std-computing-hk1.lib.homes';
    const serverPort = 20003;
    const statusElement = document.getElementById('server-status');

    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}:${serverPort}`);
        const data = await response.json();
        
        if (data.online) {
            const players = data.players || {};
            const onlinePlayers = players.online || 0;
            const maxPlayers = players.max || 60;
            console.log(`伺服器在線，玩家數: ${onlinePlayers}/${maxPlayers}`);
            statusElement.textContent = `伺服器運行中 玩家:${onlinePlayers}/${maxPlayers}`;
            statusElement.classList.add('online');
        } else {
            console.log('伺服器離線');
            statusElement.textContent = '伺服器離線';
            statusElement.classList.remove('online');
        }
    } catch (error) {
        console.error('檢查伺服器狀態時發生錯誤:', error);
        statusElement.textContent = '無法檢查伺服器狀態';
        statusElement.classList.remove('online');
    }
}

// 當DOM加載完成後執行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化粒子系統
    particlesJS('particles-js', particlesConfig);

    // 初次檢查伺服器狀態
    checkServerStatus();

    // 每60秒檢查一次伺服器狀態
    setInterval(checkServerStatus, 60000);

    // 添加滾動動畫
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    });

    // 監視所有需要動畫的元素
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    // 視差滾動效果
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
});
