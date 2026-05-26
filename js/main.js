/* ==========================================================================
   행정사무소 신뢰 - 프리미엄 JavaScript 인터랙션 코드
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       1. 헤더 스크롤 제어 (Sticky Header)
       ========================================== */
    const header = document.getElementById('header');
    
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // 초기 로드 시 체크
    
    
    /* ==========================================
       2. 모바일 내비게이션 토글 (Hamburger Menu)
       ========================================== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // 메뉴가 열려있을 때 뒷배경 스크롤 방지
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // 네비게이션 링크 클릭 시 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    
    /* ==========================================
       3. 스크롤 스파이 (Scroll Spy) - 현재 활성 메뉴 강조
       ========================================== */
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // 헤더 높이만큼 오프셋 설정
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', scrollActive);
    
    
    /* ==========================================
       4. 모달 제어 로직 (Modal Logic)
       ========================================== */
    const successModal = document.getElementById('success-modal');
    const privacyModal = document.getElementById('privacy-modal');
    
    const btnPrivacyModal = document.getElementById('btn-privacy-modal');
    const btnClosePrivacyModal = document.getElementById('btn-close-privacy-modal');
    const btnCloseSuccessModal = document.getElementById('btn-close-success-modal');
    const privacyPolicyLink = document.getElementById('privacy-policy-link');

    // 모달 열기 함수
    const openModal = (modal) => {
        if (!modal) return;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    // 모달 닫기 함수
    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    // 개인정보 처리방침 모달 이벤트
    if (btnPrivacyModal) {
        btnPrivacyModal.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(privacyModal);
        });
    }
    
    if (privacyPolicyLink) {
        privacyPolicyLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(privacyModal);
        });
    }

    if (btnClosePrivacyModal) {
        btnClosePrivacyModal.addEventListener('click', () => closeModal(privacyModal));
    }

    if (btnCloseSuccessModal) {
        btnCloseSuccessModal.addEventListener('click', () => closeModal(successModal));
    }

    // 모달 배경 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (e.target === successModal) closeModal(successModal);
        if (e.target === privacyModal) closeModal(privacyModal);
    });
    
    
    /* ==========================================
       5. 상담 신청 폼 유효성 검사 및 전송 처리
       ========================================== */
    const quickForm = document.getElementById('quick-form');
    const detailForm = document.getElementById('detail-consult-form');

    // 전화번호 포맷 정규식 검사 (숫자만 입력하도록 보정하는 리스너 추가 가능)
    const validatePhone = (phone) => {
        const regex = /^(010|02|031|032|033|041|042|043|044|051|052|053|054|055|061|062|063|064)\d{3,4}\d{4}$/;
        return regex.test(phone.replace(/[-\s]/g, ''));
    };

    // 빠른 상담 폼 제출
    if (quickForm) {
        quickForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('quick-name');
            const phoneInput = document.getElementById('quick-phone');
            const serviceSelect = document.getElementById('quick-service');
            
            if (!nameInput.value.trim()) {
                alert('성함을 입력해주세요.');
                nameInput.focus();
                return;
            }
            
            if (!validatePhone(phoneInput.value)) {
                alert('올바른 연락처 형식이 아닙니다. (예: 01012345678 또는 021234567)');
                phoneInput.focus();
                return;
            }
            
            if (!serviceSelect.value) {
                alert('상담 분야를 선택해주세요.');
                serviceSelect.focus();
                return;
            }
            
            // 데이터 수집 Mock 전송
            console.log('Quick Consultation Submitted:', {
                name: nameInput.value,
                phone: phoneInput.value,
                service: serviceSelect.value
            });

            // 폼 초기화 및 완료 모달 호출
            quickForm.reset();
            openModal(successModal);
        });
    }

    // 상세 상담 폼 제출
    if (detailForm) {
        detailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('client-name');
            const phoneInput = document.getElementById('client-phone');
            const emailInput = document.getElementById('client-email');
            const serviceSelect = document.getElementById('service-type');
            const messageInput = document.getElementById('client-message');
            const agreeCheckbox = document.getElementById('agree-privacy');
            
            if (!nameInput.value.trim()) {
                alert('성함을 입력해주세요.');
                nameInput.focus();
                return;
            }
            
            if (!validatePhone(phoneInput.value)) {
                alert('올바른 연락처 형식이 아닙니다. (예: 01012345678)');
                phoneInput.focus();
                return;
            }
            
            if (!serviceSelect.value) {
                alert('상담 분야를 선택해주세요.');
                serviceSelect.focus();
                return;
            }
            
            if (!messageInput.value.trim()) {
                alert('문의 내용을 입력해주세요.');
                messageInput.focus();
                return;
            }
            
            if (!agreeCheckbox.checked) {
                alert('개인정보 수집 및 이용에 동의하셔야 신청이 가능합니다.');
                return;
            }
            
            // 데이터 수집 Mock 전송
            console.log('Detailed Consultation Submitted:', {
                name: nameInput.value,
                phone: phoneInput.value,
                email: emailInput.value,
                service: serviceSelect.value,
                message: messageInput.value
            });

            // 폼 초기화 및 완료 모달 호출
            detailForm.reset();
            openModal(successModal);
        });
    }
    
    
    /* ==========================================
       6. 스크롤 애니메이션 효과 (Scroll Reveal)
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // 한 번 등장 후 관찰 취소
            }
        });
    }, {
        threshold: 0.15, // 요소가 15% 정도 보였을 때 실행
        rootMargin: '0px 0px -50px 0px' // 스크롤 감지 미세조정
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    
    /* ==========================================
       7. 통계 숫자 카운트업 효과 (Statistics Counter)
       ========================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2000; // 2초 동안 진행
        const frameRate = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;
        
        const countUp = () => {
            frame++;
            const progress = frame / totalFrames;
            // EaseOutQuad 수식 적용 (점점 느려지는 카운팅)
            const easeProgress = progress * (2 - progress);
            const currentVal = Math.round(easeProgress * target);
            
            el.textContent = currentVal.toLocaleString('ko-KR');
            
            if (frame < totalFrames) {
                requestAnimationFrame(countUp);
            } else {
                el.textContent = target.toLocaleString('ko-KR');
            }
        };
        
        countUp();
    };
    
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // 한 번만 카운팅
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(num => statsObserver.observe(num));

});
